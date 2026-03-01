#Requires -Version 5.1
<#
.SYNOPSIS
    Schematic3D Mobile - Sistema de Esquemáticos 3D para Celulares
.DESCRIPTION
    Programa de visualización de esquemáticos de celulares en 3D con seguimiento de líneas
    y terminal de comandos estilo PowerShell.
.NOTES
    Version: 2.0.1
    Author: Schematic3D Team
    Date: 2024
#>

[CmdletBinding()]
param(
    [switch]$Offline,
    [string]$Port = "3000",
    [switch]$NoBrowser
)

# Configuración de colores para la consola
$Host.UI.RawUI.BackgroundColor = "Black"
$Host.UI.RawUI.ForegroundColor = "Green"
Clear-Host

# Banner de inicio
function Show-Banner {
    Write-Host ""
    Write-Host "    ╔══════════════════════════════════════════════════════════════════╗" -ForegroundColor Green
    Write-Host "    ║                                                                  ║" -ForegroundColor Green
    Write-Host "    ║           ███████╗ ██████╗██╗  ██╗███████╗███╗   ███╗ █████╗    ║" -ForegroundColor Green
    Write-Host "    ║           ██╔════╝██╔════╝██║  ██║██╔════╝████╗ ████║██╔══██╗   ║" -ForegroundColor Green
    Write-Host "    ║           ███████╗██║     ███████║█████╗  ██╔████╔██║███████║   ║" -ForegroundColor Green
    Write-Host "    ║           ╚════██║██║     ██╔══██║██╔══╝  ██║╚██╔╝██║██╔══██║   ║" -ForegroundColor Green
    Write-Host "    ║           ███████║╚██████╗██║  ██║███████╗██║ ╚═╝ ██║██║  ██║   ║" -ForegroundColor Green
    Write-Host "    ║           ╚══════╝ ╚═════╝╚═╝  ╚═╝╚══════╝╚═╝     ╚═╝╚═╝  ╚═╝   ║" -ForegroundColor Green
    Write-Host "    ║                                                                  ║" -ForegroundColor Green
    Write-Host "    ║              ██████╗  █████╗ ████████╗██╗ ██████╗               ║" -ForegroundColor Green
    Write-Host "    ║              ██╔══██╗██╔══██╗╚══██╔══╝██║██╔════╝               ║" -ForegroundColor Green
    Write-Host "    ║              ██████╔╝██║  ██║   ██║   ██║██║                    ║" -ForegroundColor Green
    Write-Host "    ║              ██╔══██╗██║  ██║   ██║   ██║██║                    ║" -ForegroundColor Green
    Write-Host "    ║              ██║  ██║╚█████╔╝   ██║   ██║╚██████╗               ║" -ForegroundColor Green
    Write-Host "    ║              ╚═╝  ╚═╝ ╚════╝    ╚═╝   ╚═╝ ╚═════╝               ║" -ForegroundColor Green
    Write-Host "    ║                                                                  ║" -ForegroundColor Green
    Write-Host "    ║                    Sistema de Esquemáticos 3D                   ║" -ForegroundColor Green
    Write-Host "    ║                         Versión 2.0.1                           ║" -ForegroundColor Green
    Write-Host "    ╚══════════════════════════════════════════════════════════════════╝" -ForegroundColor Green
    Write-Host ""
}

# Función para verificar requisitos
function Test-Requirements {
    Write-Host "[INFO] Verificando requisitos del sistema..." -ForegroundColor Cyan
    
    # Verificar Node.js
    try {
        $nodeVersion = node --version 2>$null
        if ($nodeVersion) {
            Write-Host "[OK] Node.js detectado: $nodeVersion" -ForegroundColor Green
        } else {
            Write-Host "[ERROR] Node.js no está instalado" -ForegroundColor Red
            Write-Host "       Descarga Node.js desde: https://nodejs.org/" -ForegroundColor Yellow
            return $false
        }
    } catch {
        Write-Host "[ERROR] Node.js no está instalado o no está en el PATH" -ForegroundColor Red
        Write-Host "       Descarga Node.js desde: https://nodejs.org/" -ForegroundColor Yellow
        return $false
    }
    
    # Verificar npm
    try {
        $npmVersion = npm --version 2>$null
        if ($npmVersion) {
            Write-Host "[OK] npm detectado: v$npmVersion" -ForegroundColor Green
        }
    } catch {
        Write-Host "[ADVERTENCIA] npm no detectado" -ForegroundColor Yellow
    }
    
    return $true
}

# Función para instalar dependencias
function Install-Dependencies {
    param([string]$AppPath)
    
    Write-Host ""
    Write-Host "[INFO] Instalando dependencias..." -ForegroundColor Cyan
    
    Set-Location $AppPath
    
    try {
        $proc = Start-Process -FilePath "npm" -ArgumentList "install" -Wait -PassThru -NoNewWindow
        if ($proc.ExitCode -eq 0) {
            Write-Host "[OK] Dependencias instaladas correctamente" -ForegroundColor Green
            return $true
        } else {
            Write-Host "[ERROR] Error al instalar dependencias (código: $($proc.ExitCode))" -ForegroundColor Red
            return $false
        }
    } catch {
        Write-Host "[ERROR] Error al ejecutar npm install: $_" -ForegroundColor Red
        return $false
    }
}

# Función para construir el proyecto
function Build-Project {
    param([string]$AppPath)
    
    Write-Host ""
    Write-Host "[INFO] Construyendo proyecto..." -ForegroundColor Cyan
    
    Set-Location $AppPath
    
    try {
        $proc = Start-Process -FilePath "npm" -ArgumentList "run", "build" -Wait -PassThru -NoNewWindow
        if ($proc.ExitCode -eq 0) {
            Write-Host "[OK] Proyecto construido correctamente" -ForegroundColor Green
            return $true
        } else {
            Write-Host "[ERROR] Error al construir el proyecto (código: $($proc.ExitCode))" -ForegroundColor Red
            return $false
        }
    } catch {
        Write-Host "[ERROR] Error al ejecutar npm run build: $_" -ForegroundColor Red
        return $false
    }
}

# Función para iniciar servidor
function Start-Server {
    param(
        [string]$AppPath,
        [string]$Port
    )
    
    Write-Host ""
    Write-Host "[INFO] Iniciando servidor en puerto $Port..." -ForegroundColor Cyan
    
    $distPath = Join-Path $AppPath "dist"
    
    if (-not (Test-Path $distPath)) {
        Write-Host "[ERROR] No se encontró la carpeta dist. Ejecuta la construcción primero." -ForegroundColor Red
        return $null
    }
    
    # Crear servidor HTTP simple con Node.js
    $serverScript = @"
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || $Port;
const DIST_DIR = '$($distPath -replace '\\', '\\')';

const mimeTypes = {
    '.html': 'text/html',
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
    let filePath = path.join(DIST_DIR, req.url === '/' ? 'index.html' : req.url);
    
    const extname = path.extname(filePath).toLowerCase();
    const contentType = mimeTypes[extname] || 'application/octet-stream';
    
    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>404 - Archivo no encontrado</h1>', 'utf-8');
            } else {
                res.writeHead(500);
                res.end('Error del servidor: ' + err.code + ' ..\\n');
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, () => {
    console.log(\`Servidor Schematic3D Mobile corriendo en http://localhost:\${PORT}\`);
});
"@
    
    $serverFile = Join-Path $env:TEMP "schematic3d-server.js"
    $serverScript | Out-File -FilePath $serverFile -Encoding UTF8 -Force
    
    # Iniciar servidor en segundo plano
    $job = Start-Job -ScriptBlock {
        param($serverFile)
        node $serverFile
    } -ArgumentList $serverFile
    
    # Esperar a que el servidor inicie
    Start-Sleep -Seconds 2
    
    # Verificar si el servidor está corriendo
    try {
        $response = Invoke-WebRequest -Uri "http://localhost:$Port" -Method HEAD -TimeoutSec 5 -ErrorAction SilentlyContinue
        if ($response.StatusCode -eq 200) {
            Write-Host "[OK] Servidor iniciado correctamente" -ForegroundColor Green
            return $job
        }
    } catch {
        # Intentar obtener información del job
        $jobInfo = Receive-Job -Job $job -Keep
        if ($jobInfo) {
            Write-Host $jobInfo -ForegroundColor Gray
        }
        Write-Host "[OK] Servidor iniciado (verificación pendiente)" -ForegroundColor Green
        return $job
    }
    
    return $job
}

# Función para abrir navegador
function Open-Browser {
    param([string]$Url)
    
    Write-Host ""
    Write-Host "[INFO] Abriendo navegador..." -ForegroundColor Cyan
    
    try {
        Start-Process $Url
        Write-Host "[OK] Navegador abierto" -ForegroundColor Green
    } catch {
        Write-Host "[ADVERTENCIA] No se pudo abrir el navegador automáticamente" -ForegroundColor Yellow
        Write-Host "       Abre manualmente: $Url" -ForegroundColor Yellow
    }
}

# Función para mostrar menú de comandos
function Show-Commands {
    Write-Host ""
    Write-Host "    ╔══════════════════════════════════════════════════════════════════╗" -ForegroundColor Green
    Write-Host "    ║                    COMANDOS DISPONIBLES EN LA APP                ║" -ForegroundColor Green
    Write-Host "    ╠══════════════════════════════════════════════════════════════════╣" -ForegroundColor Green
    Write-Host "    ║  help, ?              - Muestra la ayuda de comandos             ║" -ForegroundColor Green
    Write-Host "    ║  list                 - Lista todos los componentes            ║" -ForegroundColor Green
    Write-Host "    ║  list [tipo]          - Lista componentes por tipo             ║" -ForegroundColor Green
    Write-Host "    ║  select [id]          - Selecciona un componente               ║" -ForegroundColor Green
    Write-Host "    ║  info [id]            - Muestra información detallada          ║" -ForegroundColor Green
    Write-Host "    ║  connections          - Muestra/oculta líneas de conexión      ║" -ForegroundColor Green
    Write-Host "    ║  trace [id]           - Traza líneas desde un componente       ║" -ForegroundColor Green
    Write-Host "    ║  phones               - Lista modelos disponibles              ║" -ForegroundColor Green
    Write-Host "    ║  load [id]            - Carga un modelo de celular             ║" -ForegroundColor Green
    Write-Host "    ║  search [texto]       - Busca componentes                      ║" -ForegroundColor Green
    Write-Host "    ║  clear                - Limpia la terminal                     ║" -ForegroundColor Green
    Write-Host "    ║  reset                - Resetea la vista 3D                    ║" -ForegroundColor Green
    Write-Host "    ║  export               - Exporta esquemático a JSON             ║" -ForegroundColor Green
    Write-Host "    ║  exit                 - Cierra la aplicación                   ║" -ForegroundColor Green
    Write-Host "    ╚══════════════════════════════════════════════════════════════════╝" -ForegroundColor Green
    Write-Host ""
}

# Función principal
function Main {
    Show-Banner
    
    # Determinar ruta de la aplicación
    $scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Definition
    $appPath = Join-Path $scriptPath "app"
    
    # Verificar si existe la carpeta app
    if (-not (Test-Path $appPath)) {
        Write-Host "[ERROR] No se encontró la carpeta 'app' en: $scriptPath" -ForegroundColor Red
        Write-Host "       Asegúrate de que el script está en la carpeta correcta." -ForegroundColor Yellow
        exit 1
    }
    
    Write-Host "[INFO] Ruta de la aplicación: $appPath" -ForegroundColor Gray
    Write-Host ""
    
    # Verificar requisitos
    if (-not (Test-Requirements)) {
        exit 1
    }
    
    # Modo offline (construir si es necesario)
    if ($Offline) {
        Write-Host ""
        Write-Host "[MODO OFFLINE] Construyendo aplicación..." -ForegroundColor Magenta
        
        if (-not (Install-Dependencies -AppPath $appPath)) {
            exit 1
        }
        
        if (-not (Build-Project -AppPath $appPath)) {
            exit 1
        }
    }
    
    # Verificar si existe la carpeta dist
    $distPath = Join-Path $appPath "dist"
    if (-not (Test-Path $distPath)) {
        Write-Host ""
        Write-Host "[INFO] No se encontró la carpeta dist. Construyendo..." -ForegroundColor Cyan
        
        if (-not (Install-Dependencies -AppPath $appPath)) {
            exit 1
        }
        
        if (-not (Build-Project -AppPath $appPath)) {
            exit 1
        }
    }
    
    # Iniciar servidor
    $serverJob = Start-Server -AppPath $appPath -Port $Port
    
    if (-not $serverJob) {
        exit 1
    }
    
    # Mostrar información
    Write-Host ""
    Write-Host "    ╔══════════════════════════════════════════════════════════════════╗" -ForegroundColor Green
    Write-Host "    ║                    SERVIDOR INICIADO                             ║" -ForegroundColor Green
    Write-Host "    ╠══════════════════════════════════════════════════════════════════╣" -ForegroundColor Green
    Write-Host "    ║  URL: http://localhost:$($Port.PadRight(51)) ║" -ForegroundColor Green
    Write-Host "    ║  Presiona Ctrl+C para detener el servidor                        ║" -ForegroundColor Green
    Write-Host "    ╚══════════════════════════════════════════════════════════════════╝" -ForegroundColor Green
    
    # Mostrar comandos disponibles
    Show-Commands
    
    # Abrir navegador
    if (-not $NoBrowser) {
        Open-Browser -Url "http://localhost:$Port"
    }
    
    Write-Host ""
    Write-Host "[INFO] Servidor corriendo. Presiona Ctrl+C para detener." -ForegroundColor Cyan
    Write-Host ""
    
    # Mantener el script en ejecución
    try {
        while ($true) {
            Start-Sleep -Seconds 1
            # Verificar si el job sigue corriendo
            if ($serverJob.State -eq "Completed" -or $serverJob.State -eq "Failed") {
                Write-Host ""
                Write-Host "[ADVERTENCIA] El servidor se ha detenido" -ForegroundColor Yellow
                $jobOutput = Receive-Job -Job $serverJob
                if ($jobOutput) {
                    Write-Host $jobOutput -ForegroundColor Gray
                }
                break
            }
        }
    } catch {
        Write-Host ""
        Write-Host "[INFO] Deteniendo servidor..." -ForegroundColor Cyan
    } finally {
        # Limpiar
        if ($serverJob) {
            Stop-Job -Job $serverJob -ErrorAction SilentlyContinue
            Remove-Job -Job $serverJob -ErrorAction SilentlyContinue
        }
        
        # Eliminar archivo temporal del servidor
        $serverFile = Join-Path $env:TEMP "schematic3d-server.js"
        if (Test-Path $serverFile) {
            Remove-Item $serverFile -Force -ErrorAction SilentlyContinue
        }
        
        Write-Host "[OK] Servidor detenido" -ForegroundColor Green
        Write-Host ""
        Write-Host "¡Gracias por usar Schematic3D Mobile!" -ForegroundColor Green
    }
}

# Ejecutar función principal
try {
    Main
} catch {
    Write-Host ""
    Write-Host "[ERROR FATAL] $_" -ForegroundColor Red
    exit 1
}
