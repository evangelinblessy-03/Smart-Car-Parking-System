@echo off
title Smart Car Parking System (GWO) - Full Stack Server
echo =================================================================
echo   Smart Car Parking System Using Grey Wolf Optimization (GWO)
echo   Starting Backend REST API (Port 5000)...
echo   Starting Frontend Vite Server (Port 8080)...
echo =================================================================
echo.

cd /d "%~dp0"
start "SmartPark Backend API (Port 5000)" cmd /k "node backend/server.js"
cd /d "%~dp0frontend"
npm run dev
pause
