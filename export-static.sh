#!/bin/bash

# Azure Solar - Static HTML Export Script
# Tworzy statyczne pliki HTML z Next.js

set -e

echo "🚀 Eksportowanie statycznej wersji strony..."

cd "$(dirname "$0")/frontend"

# 1. Build Next.js
echo "📦 Building Next.js..."
npm run build

# 2. Start server w tle
echo "🌐 Uruchamianie tymczasowego serwera..."
cd .next/standalone
node server.js &
SERVER_PID=$!
sleep 5

# 3. Pobierz statyczne strony
echo "📥 Pobieranie stron..."
cd ../../..
mkdir -p static-export

# Pobierz główną stronę PL
wget -p -k -E -H -K -P static-export http://localhost:3000/pl

# Pobierz stronę EN
wget -p -k -E -H -K -P static-export http://localhost:3000/en

# Pobierz assets
wget -r -np -nH --cut-dirs=1 -P static-export/_next http://localhost:3000/_next/

# 4. Zatrzymaj serwer
echo "🛑 Zatrzymywanie serwera..."
kill $SERVER_PID

# 5. Cleanup i restrukturyzacja
echo "🧹 Czyszczenie..."
cd static-export
mv localhost:3000/* .
rm -rf localhost:3000

echo "✅ Export zakończony!"
echo "📂 Pliki w: /Users/haos/azure-sold/static-export"
echo "🌐 Otwórz: static-export/pl.html"
