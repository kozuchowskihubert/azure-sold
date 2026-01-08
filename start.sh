#!/bin/bash

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}"
echo "   ___                        _____       __         "
echo "  / _ | _____ __ _________   / ___/____  / /__ ____  "
echo " / __ |/_/ -_) // / __/ -_)  \__ \/ __ \/ / _ \`/ _ \ "
echo "/_/ |_/___/\___/_/  \__/    /___/\____/_/\_,_/_//_/ "
echo "                                                      "
echo "    Uruchamianie aplikacji..."
echo -e "${NC}"

cd "$(dirname "$0")"

# Uruchom backend
echo -e "${YELLOW}🐍 Uruchamianie backendu...${NC}"
cd backend
source venv/bin/activate
nohup python run.py > ../backend.log 2>&1 &
BACKEND_PID=$!
echo $BACKEND_PID > ../.backend.pid
echo -e "${GREEN}✅ Backend uruchomiony (PID: $BACKEND_PID)${NC}"
cd ..

# Czekaj na backend
echo "   Czekam na backend..."
sleep 3

# Sprawdź health
if curl -s http://localhost:5001/api/health > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Backend odpowiada${NC}"
else
    echo -e "${YELLOW}⚠️  Backend jeszcze się uruchamia...${NC}"
fi

# Uruchom frontend
echo -e "${YELLOW}🌐 Uruchamianie frontendu...${NC}"
cd frontend
nohup npm run dev > ../frontend.log 2>&1 &
FRONTEND_PID=$!
echo $FRONTEND_PID > ../.frontend.pid
echo -e "${GREEN}✅ Frontend uruchomiony (PID: $FRONTEND_PID)${NC}"
cd ..

# Czekaj na frontend
echo "   Czekam na frontend..."
sleep 5

echo ""
echo -e "${GREEN}╔════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║      Aplikacja uruchomiona! 🚀         ║${NC}"
echo -e "${GREEN}╚════════════════════════════════════════╝${NC}"
echo ""
echo -e "${BLUE}📍 URLs:${NC}"
echo -e "   Frontend:  ${GREEN}http://localhost:3000${NC}"
echo -e "   Backend:   ${GREEN}http://localhost:5001/api${NC}"
echo -e "   Health:    ${GREEN}http://localhost:5001/api/health${NC}"
echo ""
echo -e "${BLUE}👤 Credentials:${NC}"
echo -e "   Admin:  admin@azure-solar.pl / admin123"
echo -e "   Client: jan.kowalski@example.com / client123"
echo ""
echo -e "${BLUE}📊 Logi:${NC}"
echo -e "   Backend:  tail -f backend.log"
echo -e "   Frontend: tail -f frontend.log"
echo ""
echo -e "${BLUE}⏹️  Zatrzymanie:${NC}"
echo -e "   ./stop.sh  LUB  make stop"
echo ""
