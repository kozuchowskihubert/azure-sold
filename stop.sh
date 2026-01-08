#!/bin/bash

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${YELLOW}⏹️  Zatrzymywanie Azure Solar...${NC}"

cd "$(dirname "$0")"

# Zatrzymaj backend
if [ -f .backend.pid ]; then
    BACKEND_PID=$(cat .backend.pid)
    if ps -p $BACKEND_PID > /dev/null 2>&1; then
        echo "   Zatrzymuję backend (PID: $BACKEND_PID)..."
        kill $BACKEND_PID
        echo -e "${GREEN}✅ Backend zatrzymany${NC}"
    fi
    rm .backend.pid
fi

# Zatrzymaj frontend
if [ -f .frontend.pid ]; then
    FRONTEND_PID=$(cat .frontend.pid)
    if ps -p $FRONTEND_PID > /dev/null 2>&1; then
        echo "   Zatrzymuję frontend (PID: $FRONTEND_PID)..."
        kill $FRONTEND_PID
        echo -e "${GREEN}✅ Frontend zatrzymany${NC}"
    fi
    rm .frontend.pid
fi

# Wyczyść porty (na wszelki wypadek)
echo "   Czyszczę porty 5001 i 3000..."
lsof -ti:5001 | xargs kill -9 2>/dev/null || true
lsof -ti:3000 | xargs kill -9 2>/dev/null || true

echo -e "${GREEN}✅ Aplikacja zatrzymana${NC}"
