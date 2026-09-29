@echo off
echo Fixing Vite Build Cache Issue...
echo.
echo This error happens when the browser tries to load old cached JavaScript modules.
echo.

echo Step 1: Removing dist directory...
if exist dist (
    rmdir /s /q dist
    echo ✓ dist directory removed
) else (
    echo ✓ dist directory not found
)

echo.
echo Step 2: Removing node_modules cache...
if exist node_modules\.vite (
    rmdir /s /q node_modules\.vite
    echo ✓ Vite cache removed
) else (
    echo ✓ Vite cache not found
)

echo.
echo Step 3: Clearing browser cache (instructions)...
echo Please do ONE of the following in your browser:
echo   - Press Ctrl+Shift+Delete and clear cache
echo   - Press Ctrl+F5 to hard refresh
echo   - Open DevTools (F12) ^> Right-click refresh button ^> Empty Cache and Hard Reload
echo.

echo Step 4: Restarting dev server...
echo Please stop the current dev server (Ctrl+C) if running
echo Then start it again with: npm run dev
echo.

pause
