@echo off
REM Install Node.js using Windows Package Manager (winget)
echo Installing Node.js using winget...

REM Check if winget is available
where winget >nul 2>nul
if errorlevel 1 (
    echo winget not found. Please install Node.js manually from https://nodejs.org/
    echo Visit: https://nodejs.org/dist/v18.18.0/node-v18.18.0-x64.msi
    pause
    exit /b 1
)

REM Install Node.js
winget install OpenJS.NodeJS

echo.
echo Node.js installation complete!
echo Please close and reopen the terminal, then run start.bat again.
pause
