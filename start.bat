@echo off
echo ========================================
echo    API Lab - Django + React
echo ========================================
echo.

echo [1/2] Iniciando Backend Django...
start cmd /k "cd /d %~dp0 && ..\venv\Scripts\activate && python manage.py runserver"

echo [2/2] Iniciando Frontend React...
timeout /t 3 /nobreak > nul
start cmd /k "cd /d %~dp0client && npm run dev"

echo.
echo ========================================
echo   Proyecto iniciado correctamente!
echo ========================================
echo.
echo Backend:  http://localhost:8000
echo Frontend: http://localhost:5173
echo GraphiQL: http://localhost:8000/graphql/
echo.
echo Presiona cualquier tecla para cerrar esta ventana...
pause > nul

