@echo off
chcp 65001 >nul
title Schematic3D Mobile v2.0.1
color 0A
cls

echo.
echo    ╔══════════════════════════════════════════════════════════════════╗
echo    ║                                                                  ║
echo    ║           SCHEMATIC3D MOBILE - Sistema de Esquemáticos 3D       ║
echo    ║                         Versión 2.0.1                           ║
echo    ║                                                                  ║
echo    ╚══════════════════════════════════════════════════════════════════╝
echo.

echo [INFO] Verificando PowerShell...
powershell -Command "Get-Host" >nul 2>&1
if errorlevel 1 (
    echo [ERROR] PowerShell no está disponible
    pause
    exit /b 1
)

echo [INFO] Iniciando Schematic3D Mobile...
echo.

powershell -ExecutionPolicy Bypass -File "%~dp0Schematic3D-Mobile.ps1" %*

if errorlevel 1 (
    echo.
    echo [ERROR] El programa terminó con errores
    echo.
    echo Presiona cualquier tecla para salir...
    pause >nul
)

exit /b 0
