# PowerShell script to clear all caches and restart fresh

Write-Host "🧹 Clearing Vite and build caches..." -ForegroundColor Cyan

# Clear Vite cache
if (Test-Path "node_modules\.vite") {
    Remove-Item -Recurse -Force "node_modules\.vite"
    Write-Host "✅ Cleared node_modules\.vite" -ForegroundColor Green
} else {
    Write-Host "⚠️  node_modules\.vite not found (already clean)" -ForegroundColor Yellow
}

# Clear local .vite folder
if (Test-Path ".vite") {
    Remove-Item -Recurse -Force ".vite"
    Write-Host "✅ Cleared .vite" -ForegroundColor Green
}

# Clear dist folder
if (Test-Path "dist") {
    Remove-Item -Recurse -Force "dist"
    Write-Host "✅ Cleared dist" -ForegroundColor Green
}

Write-Host ""
Write-Host "✨ Cache cleared successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Next steps:" -ForegroundColor Cyan
Write-Host "1. Clear browser: F12 → Application → Clear site data" -ForegroundColor White
Write-Host "2. Close all browser tabs with localhost:5173" -ForegroundColor White
Write-Host "3. Run: npm run dev" -ForegroundColor White
Write-Host ""
