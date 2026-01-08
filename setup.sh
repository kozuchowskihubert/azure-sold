#!/bin/bash

# 🚀 Azure Solar - Automatyczna Instalacja i Uruchomienie
# Dla macOS/Linux

set -e  # Exit on error

# Kolory dla outputu
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}"
cat << "EOF"
   ___                        _____       __         
  / _ | _____ __ _________   / ___/____  / /__ ____  
 / __ |/_/ -_) // / __/ -_)  \__ \/ __ \/ / _ `/ _ \ 
/_/ |_/___/\___/_/  \__/    /___/\____/_/\_,_/_//_/ 
                                                      
    Automatyczna instalacja i konfiguracja
EOF
echo -e "${NC}"

# Funkcja sprawdzająca wymagania
check_requirements() {
    echo -e "${YELLOW}📋 Sprawdzanie wymagań...${NC}"
    
    # Node.js
    if ! command -v node &> /dev/null; then
        echo -e "${RED}❌ Node.js nie jest zainstalowany!${NC}"
        echo -e "   Pobierz z: https://nodejs.org/"
        exit 1
    fi
    echo -e "${GREEN}✅ Node.js $(node --version)${NC}"
    
    # Python
    if ! command -v python3 &> /dev/null; then
        echo -e "${RED}❌ Python 3 nie jest zainstalowany!${NC}"
        echo -e "   Pobierz z: https://www.python.org/downloads/"
        exit 1
    fi
    echo -e "${GREEN}✅ Python $(python3 --version)${NC}"
    
    # PostgreSQL
    if ! command -v psql &> /dev/null; then
        echo -e "${YELLOW}⚠️  PostgreSQL nie jest zainstalowany!${NC}"
        echo -e "   Instaluję PostgreSQL..."
        if [[ "$OSTYPE" == "darwin"* ]]; then
            brew install postgresql@14
            brew services start postgresql@14
        else
            echo -e "${RED}   Zainstaluj PostgreSQL ręcznie: https://www.postgresql.org/download/${NC}"
            exit 1
        fi
    fi
    echo -e "${GREEN}✅ PostgreSQL zainstalowany${NC}"
    
    echo ""
}

# Funkcja tworzenia bazy danych
setup_database() {
    echo -e "${YELLOW}🗄️  Konfiguracja bazy danych...${NC}"
    
    # Użyj domyślnego hasła "postgresql" dla developmentu
    DB_PASSWORD="postgresql"
    echo "   Używam hasła: postgresql (development)"
    
    # Wykryj użytkownika PostgreSQL (postgres lub aktualny user)
    PG_USER=$(whoami)
    if psql -U postgres -c "SELECT 1" > /dev/null 2>&1; then
        PG_USER="postgres"
    fi
    
    echo "   Używam użytkownika PostgreSQL: $PG_USER"
    
    # Utwórz bazę i użytkownika
    psql -U $PG_USER -d postgres << EOF
DROP DATABASE IF EXISTS azure_solar;
DROP USER IF EXISTS azure_user;
CREATE DATABASE azure_solar;
CREATE USER azure_user WITH PASSWORD '$DB_PASSWORD';
GRANT ALL PRIVILEGES ON DATABASE azure_solar TO azure_user;
\c azure_solar
GRANT ALL ON SCHEMA public TO azure_user;
EOF
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ Baza danych utworzona${NC}"
    else
        echo -e "${RED}❌ Błąd tworzenia bazy danych${NC}"
        echo -e "   Spróbuj ręcznie: psql -U $PG_USER postgres"
        exit 1
    fi
    
    echo ""
}

# Funkcja konfiguracji backendu
setup_backend() {
    echo -e "${YELLOW}🐍 Konfiguracja backendu (Python/Flask)...${NC}"
    
    cd backend
    
    # Utwórz venv
    echo "   Tworzenie virtual environment..."
    python3 -m venv venv
    source venv/bin/activate
    
    # Instalacja zależności
    echo "   Instalacja zależności Python..."
    pip install --upgrade pip > /dev/null 2>&1
    pip install -r requirements.txt > /dev/null 2>&1
    
    # Konfiguracja .env
    if [ ! -f .env ]; then
        echo "   Tworzenie pliku .env..."
        cp .env.example .env
        
        # Generuj losowe klucze
        SECRET_KEY=$(python3 -c "import secrets; print(secrets.token_urlsafe(32))")
        JWT_SECRET_KEY=$(python3 -c "import secrets; print(secrets.token_urlsafe(32))")
        
        # Aktualizuj .env
        if [[ "$OSTYPE" == "darwin"* ]]; then
            sed -i '' "s|your-super-secret-key-change-this-in-production|$SECRET_KEY|g" .env
            sed -i '' "s|your-jwt-secret-key|$JWT_SECRET_KEY|g" .env
            sed -i '' "s|your_password|$DB_PASSWORD|g" .env
        else
            sed -i "s|your-super-secret-key-change-this-in-production|$SECRET_KEY|g" .env
            sed -i "s|your-jwt-secret-key|$JWT_SECRET_KEY|g" .env
            sed -i "s|your_password|$DB_PASSWORD|g" .env
        fi
        
        echo -e "${GREEN}   ✅ Plik .env skonfigurowany${NC}"
    fi
    
    # Konfiguracja email (opcjonalnie)
    echo ""
    read -p "Czy chcesz skonfigurować email (Gmail SMTP)? (t/n): " SETUP_EMAIL
    if [[ $SETUP_EMAIL == "t" || $SETUP_EMAIL == "T" ]]; then
        read -p "Gmail address: " GMAIL_ADDRESS
        read -sp "Gmail app password: " GMAIL_PASSWORD
        echo ""
        
        if [[ "$OSTYPE" == "darwin"* ]]; then
            sed -i '' "s|your-email@gmail.com|$GMAIL_ADDRESS|g" .env
            sed -i '' "s|your-app-specific-password|$GMAIL_PASSWORD|g" .env
        else
            sed -i "s|your-email@gmail.com|$GMAIL_ADDRESS|g" .env
            sed -i "s|your-app-specific-password|$GMAIL_PASSWORD|g" .env
        fi
    fi
    
    # Inicjalizacja bazy danych
    echo ""
    echo "   Inicjalizacja bazy danych..."
    python init_db.py
    
    echo -e "${GREEN}✅ Backend skonfigurowany${NC}"
    
    deactivate
    cd ..
    echo ""
}

# Funkcja konfiguracji frontendu
setup_frontend() {
    echo -e "${YELLOW}🌐 Konfiguracja frontendu (Next.js)...${NC}"
    
    cd frontend
    
    # Instalacja zależności
    echo "   Instalacja zależności Node.js..."
    npm install --silent
    
    # Konfiguracja .env.local
    if [ ! -f .env.local ]; then
        echo "   Tworzenie pliku .env.local..."
        cp .env.example .env.local
        echo -e "${GREEN}   ✅ Plik .env.local utworzony${NC}"
    fi
    
    echo -e "${GREEN}✅ Frontend skonfigurowany${NC}"
    
    cd ..
    echo ""
}

# Funkcja tworzenia skryptu uruchamiającego
create_run_script() {
    echo -e "${YELLOW}📝 Tworzenie skryptu uruchamiającego...${NC}"
    
    cat > start.sh << 'EOF'
#!/bin/bash

# Kolory
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${BLUE}🚀 Uruchamianie Azure Solar...${NC}\n"

# Uruchom backend w tle
echo -e "${YELLOW}▶️  Backend (Flask)...${NC}"
cd backend
source venv/bin/activate
python run.py > ../backend.log 2>&1 &
BACKEND_PID=$!
deactivate
cd ..

# Poczekaj na uruchomienie backendu
sleep 3

# Sprawdź czy backend działa
if curl -s http://localhost:5000/api/health > /dev/null; then
    echo -e "${GREEN}✅ Backend: http://localhost:5000${NC}\n"
else
    echo -e "${RED}❌ Backend nie uruchomił się poprawnie${NC}"
    echo "   Sprawdź logi: tail -f backend.log"
    exit 1
fi

# Uruchom frontend
echo -e "${YELLOW}▶️  Frontend (Next.js)...${NC}"
cd frontend
npm run dev > ../frontend.log 2>&1 &
FRONTEND_PID=$!
cd ..

# Poczekaj na uruchomienie frontendu
sleep 5

echo -e "${GREEN}✅ Frontend: http://localhost:3000${NC}\n"

echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}🎉 Azure Solar działa!${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "🌐 Frontend:  ${GREEN}http://localhost:3000${NC}"
echo -e "🔌 Backend:   ${GREEN}http://localhost:5000${NC}"
echo ""
echo -e "👤 Panel klienta: ${YELLOW}http://localhost:3000/client/login${NC}"
echo -e "   Email: jan.kowalski@example.com"
echo -e "   Hasło: client123"
echo ""
echo -e "⚙️  Panel admina:  ${YELLOW}http://localhost:3000/admin/login${NC}"
echo -e "   Email: admin@azure-solar.pl"
echo -e "   Hasło: admin123"
echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo "Backend PID: $BACKEND_PID"
echo "Frontend PID: $FRONTEND_PID"
echo ""
echo "📊 Logi:"
echo "   Backend:  tail -f backend.log"
echo "   Frontend: tail -f frontend.log"
echo ""
echo "⏹️  Aby zatrzymać: ./stop.sh"
echo ""

# Zapisz PID-y
echo $BACKEND_PID > .backend.pid
echo $FRONTEND_PID > .frontend.pid

# Trzymaj skrypt działający
wait
EOF
    
    chmod +x start.sh
    
    # Utwórz skrypt stop
    cat > stop.sh << 'EOF'
#!/bin/bash

RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m'

echo -e "${RED}⏹️  Zatrzymywanie Azure Solar...${NC}\n"

# Zatrzymaj backend
if [ -f .backend.pid ]; then
    BACKEND_PID=$(cat .backend.pid)
    if ps -p $BACKEND_PID > /dev/null; then
        kill $BACKEND_PID
        echo -e "${GREEN}✅ Backend zatrzymany${NC}"
    fi
    rm .backend.pid
fi

# Zatrzymaj frontend
if [ -f .frontend.pid ]; then
    FRONTEND_PID=$(cat .frontend.pid)
    if ps -p $FRONTEND_PID > /dev/null; then
        kill $FRONTEND_PID
        echo -e "${GREEN}✅ Frontend zatrzymany${NC}"
    fi
    rm .frontend.pid
fi

# Zabij pozostałe procesy na portach
lsof -ti:5000 | xargs kill -9 2>/dev/null
lsof -ti:3000 | xargs kill -9 2>/dev/null

echo -e "\n${GREEN}🛑 Azure Solar zatrzymany${NC}"
EOF
    
    chmod +x stop.sh
    
    echo -e "${GREEN}✅ Skrypty utworzone: start.sh, stop.sh${NC}"
    echo ""
}

# Główna funkcja
main() {
    echo -e "${BLUE}╔════════════════════════════════════════╗${NC}"
    echo -e "${BLUE}║  Azure Solar - Automatyczna Instalacja ║${NC}"
    echo -e "${BLUE}╚════════════════════════════════════════╝${NC}"
    echo ""
    
    check_requirements
    
    read -p "Kontynuować instalację? (t/n): " CONTINUE
    if [[ $CONTINUE != "t" && $CONTINUE != "T" ]]; then
        echo "Instalacja anulowana."
        exit 0
    fi
    
    echo ""
    setup_database
    setup_backend
    setup_frontend
    create_run_script
    
    echo -e "${GREEN}╔═══════════════════════════════════════════╗${NC}"
    echo -e "${GREEN}║  ✅ Instalacja zakończona pomyślnie!      ║${NC}"
    echo -e "${GREEN}╚═══════════════════════════════════════════╝${NC}"
    echo ""
    echo -e "${BLUE}🚀 Aby uruchomić aplikację:${NC}"
    echo -e "   ${YELLOW}./start.sh${NC}"
    echo ""
    echo -e "${BLUE}⏹️  Aby zatrzymać aplikację:${NC}"
    echo -e "   ${YELLOW}./stop.sh${NC}"
    echo ""
    echo -e "${BLUE}📚 Więcej informacji:${NC}"
    echo -e "   README.md"
    echo -e "   INSTALLATION.md"
    echo ""
    
    read -p "Uruchomić teraz? (t/n): " RUN_NOW
    if [[ $RUN_NOW == "t" || $RUN_NOW == "T" ]]; then
        ./start.sh
    fi
}

# Uruchom instalację
main
