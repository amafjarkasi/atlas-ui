@echo off
cd /d "%~dp0"
set "PATH=%USERPROFILE%\.bun\bin;%PATH%"
"%USERPROFILE%\.bun\bin\bun.exe" --hot src\app.tsx
pause
