@echo off
echo Installing and starting Water Tracker...
echo.

REM Add Node.js to PATH if needed
set PATH=C:\nodejs;%PATH%

REM Check if node exists
where node >nul 2>nul
if errorlevel 1 (
    echo Node.js not found. Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

REM Start backend in a new window
echo Starting backend server...
start "Water Tracker - Backend" cmd /k "cd /d %~dp0backend && npm install && npm start"

REM Wait a moment for backend to start
timeout /t 3

REM Start frontend in a new window
echo Starting frontend server...
start "Water Tracker - Frontend" cmd /k "cd /d %~dp0frontend && npm install && npm start"

echo.
echo Both servers are starting:
echo - Backend: http://localhost:5000
echo - Frontend: http://localhost:3000
echo.
pause
