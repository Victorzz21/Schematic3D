@echo off
chcp 65001 >nul
title Instalador Schematic3D Mobile
color 0A
cls

echo.
echo    ╔══════════════════════════════════════════════════════════════════╗
echo    ║                INSTALADOR SCHEMATIC3D MOBILE                     ║
echo    ╚══════════════════════════════════════════════════════════════════╝
echo.

echo ========================================
echo Paso 1: Verificando Node.js
echo ========================================
node --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Node.js no está instalado
    echo.
    echo Por favor, descarga e instala Node.js desde:
    echo https://nodejs.org/
    echo.
    echo Después de instalar, vuelve a ejecutar este archivo.
    echo.
    pause
    exit /b 1
)

echo [OK] Node.js detectado:
node --version
echo.

echo ========================================
echo Paso 2: Instalando dependencias
echo ========================================
cd /d "%~dp0app"
if not exist "package.json" (
    echo [ERROR] No se encontró package.json
    echo Asegúrate de extraer todos los archivos correctamente.
    pause
    exit /b 1
)

echo [INFO] Ejecutando npm install...
echo Esto puede tardar varios minutos...
echo.
npm install
if errorlevel 1 (
    echo [ERROR] Error al instalar dependencias
    pause
    exit /b 1
)

echo [OK] Dependencias instaladas correctamente
echo.

echo ========================================
echo Paso 3: Construyendo proyecto
echo ========================================
echo [INFO] Ejecutando npm run build...
echo.
npm run build
if errorlevel 1 (
    echo [ERROR] Error al construir el proyecto
    pause
    exit /b 1
)

echo [OK] Proyecto construido correctamente
echo.

echo ========================================
echo Instalación completada!
echo ========================================
echo.
echo Para iniciar Schematic3D Mobile:
echo 1. Haz doble clic en "Iniciar-Schematic3D.bat"
echo    O
echo 2. Ejecuta en PowerShell: .\Schematic3D-Mobile.ps1
echo.
echo ¿Deseas iniciar la aplicación ahora?
choice /C SN /M "Iniciar ahora"
if errorlevel 2 goto :fin
if errorlevel 1 goto :iniciar

:iniciar
cd /d "%~dp0"
powershell -ExecutionPolicy Bypass -File "Schematic3D-Mobile.ps1"
goto :fin

:fin
echo.
pause
