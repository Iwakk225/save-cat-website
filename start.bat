@echo off
title SaveCat - All Services
color 0A

echo ========================================
echo    Starting All Services...
echo ========================================
echo.

npm run start:all

echo.
echo Press Ctrl+C to stop all services
echo ========================================
echo.

pause >nul