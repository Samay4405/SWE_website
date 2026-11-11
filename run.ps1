# SWE MIT-WPU Website - Side-by-Side Dual Runner (PowerShell)
$ErrorActionPreference = "Stop"

$RootDir = $PSScriptRoot
$PrevDir = Join-Path $RootDir ".prev_version"

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "  SWE MIT-WPU Website - Side-by-Side Dual Runner" -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan

# 1. Setup worktree for previous version (HS-change) if not present
if (-not (Test-Path $PrevDir)) {
    Write-Host "📦 Setting up .prev_version worktree for branch HS-change..." -ForegroundColor Yellow
    git worktree add $PrevDir HS-change
    
    $PrevNodeModules = Join-Path $PrevDir "node_modules"
    $RootNodeModules = Join-Path $RootDir "node_modules"
    if (-not (Test-Path $PrevNodeModules)) {
        Write-Host "🔗 Linking node_modules..." -ForegroundColor Yellow
        cmd.exe /c "mklink /J `"$PrevNodeModules`" `"$RootNodeModules`""
    }
    
    $RootLock = Join-Path $RootDir "package-lock.json"
    $PrevLock = Join-Path $PrevDir "package-lock.json"
    if (Test-Path $RootLock) {
        Copy-Item $RootLock $PrevLock -Force
    }
}

Write-Host ""
Write-Host "🌟 [1/2] Launching Revamped Version (experimental_stuff) on port 3000..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd `"$RootDir`"; npx next dev -p 3000"

Write-Host "⏳ [2/2] Launching Previous Version (HS-change) on port 3001..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd `"$PrevDir`"; npx next dev -p 3001"

Write-Host ""
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "✅ Both servers launched in separate windows:" -ForegroundColor Cyan
Write-Host "   👉 Revamped: http://localhost:3000 (experimental_stuff)" -ForegroundColor Green
Write-Host "   👉 Previous: http://localhost:3001 (HS-change)" -ForegroundColor Yellow
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "Close the spawned PowerShell windows when you want to stop them."

