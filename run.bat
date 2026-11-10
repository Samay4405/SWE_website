@echo off
setlocal enabledelayedexpansion

echo ==========================================================
echo   SWE MIT-WPU Website - Side-by-Side Dual Runner
echo ==========================================================

set ROOT_DIR=%~dp0
set ROOT_DIR=%ROOT_DIR:~0,-1%
set PREV_DIR=%ROOT_DIR%\.prev_version

REM 1. Setup worktree for previous version if not present
if not exist "%PREV_DIR%" (
    echo [Setup] Creating .prev_version worktree for branch HS-change...
    git worktree add "%PREV_DIR%" HS-change
    if not exist "%PREV_DIR%\node_modules" (
        echo [Setup] Linking node_modules...
        mklink /J "%PREV_DIR%\node_modules" "%ROOT_DIR%\node_modules"
    )
    copy "%ROOT_DIR%\package-lock.json" "%PREV_DIR%\package-lock.json" >nul 2>&1
)

echo.
echo [1/2] Launching Revamped Version (experimental_stuff) on port 3000...
start "SWE Revamped - Port 3000" /D "%ROOT_DIR%" cmd /c "npx next dev -p 3000"

echo [2/2] Launching Previous Version (HS-change) on port 3001...
start "SWE Previous - Port 3001" /D "%PREV_DIR%" cmd /c "npx next dev -p 3001"

echo.
echo ==========================================================
echo  Both servers launched in separate terminal windows:
echo    * Revamped: http://localhost:3000 (experimental_stuff)
echo    * Previous: http://localhost:3001 (HS-change)
echo ==========================================================
echo Close the respective terminal windows to stop the servers.
pause
