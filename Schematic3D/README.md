# Schematic3D Mobile v2.0.1

Sistema de Esquemáticos 3D para Celulares con Terminal PowerShell

![Versión](https://img.shields.io/badge/versión-2.0.1-green)
![Node.js](https://img.shields.io/badge/Node.js-18%2B-brightgreen)
![Three.js](https://img.shields.io/badge/Three.js-r160-blue)

## Características

- **Visualización 3D Interactiva**: Explora esquemáticos de celulares en 3D con rotación, zoom y paneo
- **Seguimiento de Líneas**: Visualiza conexiones entre componentes con colores diferenciados (power, data, signal)
- **Terminal PowerShell**: Control completo mediante comandos tipo PowerShell
- **Múltiples Modelos**: Incluye iPhone 15 Pro, Samsung Galaxy S24 Ultra y Google Pixel 8 Pro
- **Información Detallada**: Datos técnicos de cada componente
- **Exportación**: Exporta esquemáticos a formato JSON

## Modelos Incluidos

| Modelo | Marca | Año | Componentes |
|--------|-------|-----|-------------|
| iPhone 15 Pro | Apple | 2023 | 14 |
| Galaxy S24 Ultra | Samsung | 2024 | 14 |
| Pixel 8 Pro | Google | 2023 | 14 |

## Tipos de Componentes

- **CPU**: Procesador principal
- **GPU**: Unidad de procesamiento gráfico
- **RAM**: Memoria RAM
- **Storage**: Almacenamiento interno
- **Battery**: Batería
- **Camera**: Cámaras (principal, ultra-wide, telefoto)
- **Display**: Pantalla
- **Connector**: Puertos de conexión
- **Sensor**: Sensores diversos
- **Antenna**: Módulos de conectividad

## Instalación

### Requisitos

- **Node.js** 18.0 o superior: [Descargar](https://nodejs.org/)
- **PowerShell** 5.1 o superior (incluido en Windows)

### Pasos de Instalación

1. **Extrae el archivo** en la carpeta deseada
2. **Abre PowerShell** en esa carpeta
3. **Ejecuta el script**:

```powershell
.\Schematic3D-Mobile.ps1
```

### Primera Ejecución

En la primera ejecución, el script instalará automáticamente las dependencias necesarias. Esto puede tardar unos minutos.

## Uso

### Método 1: Script PowerShell (Recomendado)

```powershell
# Ejecución normal
.\Schematic3D-Mobile.ps1

# Modo offline (construye antes de iniciar)
.\Schematic3D-Mobile.ps1 -Offline

# Puerto personalizado
.\Schematic3D-Mobile.ps1 -Port 8080

# Sin abrir navegador automáticamente
.\Schematic3D-Mobile.ps1 -NoBrowser
```

### Método 2: Manual con npm

```powershell
# Navegar a la carpeta app
cd app

# Instalar dependencias (primera vez)
npm install

# Construir proyecto
npm run build

# Iniciar servidor de desarrollo
npm run dev
```

### Método 3: Servidor Estático

```powershell
# Después de construir
cd app\dist

# Con Python
python -m http.server 3000

# Con Node.js
npx serve .
```

## Comandos de Terminal

Una vez abierta la aplicación, usa estos comandos en la terminal integrada:

### Comandos Básicos

| Comando | Descripción |
|---------|-------------|
| `help` o `?` | Muestra la ayuda |
| `list` | Lista todos los componentes |
| `list [tipo]` | Lista componentes por tipo (cpu, gpu, ram, etc.) |
| `select [id]` | Selecciona un componente |
| `info [id]` | Muestra información detallada |

### Comandos de Visualización

| Comando | Descripción |
|---------|-------------|
| `connections` | Muestra/oculta líneas de conexión |
| `trace [id]` | Traza líneas desde un componente |
| `reset` | Resetea la vista 3D |

### Comandos de Modelos

| Comando | Descripción |
|---------|-------------|
| `phones` | Lista modelos disponibles |
| `load [id]` | Carga un modelo (iphone-15-pro, samsung-s24-ultra, pixel-8-pro) |
| `search [texto]` | Busca componentes |

### Otros Comandos

| Comando | Descripción |
|---------|-------------|
| `clear` | Limpia la terminal |
| `export` | Exporta esquemático a JSON |
| `exit` | Cierra la aplicación |

## Controles del Mouse (Vista 3D)

- **Click izquierdo + arrastrar**: Rotar la vista
- **Scroll**: Zoom in/out
- **Click en componente**: Seleccionar y ver información
- **Click derecho + arrastrar**: Paneo

## Colores de Conexiones

- **Rojo (`#ff4444`)**: Conexiones de energía (power)
- **Azul (`#4444ff`)**: Conexiones de datos (data)
- **Verde (`#44ff44`)**: Conexiones de señal (signal)

## Estructura del Proyecto

```
Schematic3D-Mobile/
├── Schematic3D-Mobile.ps1    # Script principal de PowerShell
├── README.md                  # Este archivo
├── app/                       # Aplicación React
│   ├── src/
│   │   ├── components/        # Componentes React
│   │   │   ├── 3d/           # Componentes Three.js
│   │   │   ├── Terminal.tsx  # Terminal de comandos
│   │   │   └── ComponentInfo.tsx
│   │   ├── data/             # Datos de modelos
│   │   │   └── phones.ts     # Definición de celulares
│   │   ├── types/            # Tipos TypeScript
│   │   │   └── phone.ts
│   │   ├── App.tsx           # Componente principal
│   │   └── index.css         # Estilos
│   ├── dist/                 # Build de producción
│   └── package.json
```

## Solución de Problemas

### Error: "No se encontró la carpeta 'app'"

Asegúrate de que el script `Schematic3D-Mobile.ps1` está en la misma carpeta que la carpeta `app`.

### Error: "Node.js no está instalado"

Descarga e instala Node.js desde [nodejs.org](https://nodejs.org/)

### Error de ejecución de scripts en PowerShell

Si ves un error sobre políticas de ejecución, ejecuta:

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Puerto ocupado

Si el puerto 3000 está ocupado, usa otro puerto:

```powershell
.\Schematic3D-Mobile.ps1 -Port 8080
```

## Tecnologías Utilizadas

- **React 18** - Framework de UI
- **TypeScript** - Tipado estático
- **Three.js** - Gráficos 3D
- **React Three Fiber** - Integración React + Three.js
- **Tailwind CSS** - Estilos
- **shadcn/ui** - Componentes de UI
- **Vite** - Build tool

## Licencia

MIT License - Libre para uso personal y comercial.

## Créditos

Desarrollado con ❤️ para la comunidad de reparación de dispositivos móviles.

---

**Versión**: 2.0.1  
**Fecha**: 2024  
**Contacto**: Para soporte, abre un issue en el repositorio.
