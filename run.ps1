$ErrorActionPreference = 'Stop'
Set-Location $PSScriptRoot

$bunPath = "$env:USERPROFILE\.bun\bin\bun.exe"
if (-not (Test-Path $bunPath)) {
    $bunCmd = Get-Command bun -ErrorAction SilentlyContinue
    if ($bunCmd) {
        $bunPath = $bunCmd.Source
    } else {
        Write-Error "Bun not found at $bunPath"
        pause
        exit 1
    }
}

$env:PATH = "$env:USERPROFILE\.bun\bin;C:\Program Files\nodejs;$env:PATH"

Write-Host "Starting Atlas Weekly GPUIX application via Bun..." -ForegroundColor Cyan
& $bunPath --hot src/app.tsx
