#!/bin/bash
# Bash script to clear all caches and restart fresh

echo "🧹 Clearing Vite and build caches..."

# Clear Vite cache
if [ -d "node_modules/.vite" ]; then
    rm -rf node_modules/.vite
    echo "✅ Cleared node_modules/.vite"
else
    echo "⚠️  node_modules/.vite not found (already clean)"
fi

# Clear local .vite folder
if [ -d ".vite" ]; then
    rm -rf .vite
    echo "✅ Cleared .vite"
fi

# Clear dist folder
if [ -d "dist" ]; then
    rm -rf dist
    echo "✅ Cleared dist"
fi

echo ""
echo "✨ Cache cleared successfully!"
echo ""
echo "📋 Next steps:"
echo "1. Clear browser: F12 → Application → Clear site data"
echo "2. Close all browser tabs with localhost:5173"
echo "3. Run: npm run dev"
echo ""
