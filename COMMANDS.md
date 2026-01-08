# 🎯 Azure Solar - Szybka Referencja Komend

## 🚀 Najważniejsze komendy

### Podstawowe użycie:

```bash
# INSTALACJA (raz)
./setup.sh              # Automatyczna instalacja (Linux/macOS)
setup.bat               # Automatyczna instalacja (Windows)

# LUB użyj Make
make setup              # To samo co ./setup.sh

# URUCHOMIENIE
./start.sh              # Linux/macOS
start.bat               # Windows
make start              # Make

# ZATRZYMANIE
./stop.sh               # Linux/macOS
stop.bat                # Windows
make stop               # Make
```

---

## 📋 Makefile - Wszystkie komendy

```bash
make help               # Pokaż wszystkie dostępne komendy
make setup              # Automatyczna instalacja
make install            # Zainstaluj zależności
make start              # Uruchom aplikację
make stop               # Zatrzymaj aplikację
make restart            # Restart
make dev                # Development mode (z logami)
make logs               # Pokaż logi
make clean              # Wyczyść cache
make test               # Uruchom testy
make build              # Build produkcyjny
make status             # Sprawdź status
make urls               # Pokaż wszystkie URL-e
make info               # Info o projekcie
```

### Backend:

```bash
make backend            # Uruchom tylko backend
make db-init            # Inicjalizuj bazę
make db-reset           # Reset bazy (USUWA DANE!)
make test-backend       # Testy backendu
make logs-backend       # Logi backendu
make shell-backend      # Python shell z app context
```

### Frontend:

```bash
make frontend           # Uruchom tylko frontend
make test-frontend      # Testy frontendu
make logs-frontend      # Logi frontendu
make type-check         # Sprawdź typy TypeScript
```

### Development:

```bash
make lint               # Linting (flake8 + eslint)
make format             # Formatowanie (black + prettier)
make clean              # Wyczyść cache
make clean-all          # Usuń wszystko (venv, node_modules)
```

### Deployment:

```bash
make prod               # Tryb produkcyjny
make build              # Build frontendu
make deploy-vercel      # Deploy na Vercel
make deploy-azure       # Deploy na Azure
```

### Monitoring:

```bash
make status             # Status aplikacji
make health             # Health check API
make ps                 # Pokaż procesy
make ports              # Sprawdź porty
```

---

## 🎮 VSCode Tasks (Ctrl+Shift+B)

Otwórz workspace: `azure-solar.code-workspace`

Dostępne tasks:
- 🚀 Start Application
- ⏹️ Stop Application  
- 🐍 Start Backend Only
- 🌐 Start Frontend Only
- 📦 Install Dependencies
- 🗄️ Initialize Database
- 🧪 Run Tests
- 🏗️ Build Production
- 📊 Show Logs
- 🧹 Clean Cache

---

## 🔧 Ręczne komendy

### Backend:

```bash
cd backend

# Aktywacja venv
source venv/bin/activate  # macOS/Linux
venv\Scripts\activate     # Windows

# Uruchomienie
python run.py

# Inicjalizacja bazy
python init_db.py

# Testy
pytest

# Linting
flake8 app/

# Formatowanie
black app/

# Deaktywacja
deactivate
```

### Frontend:

```bash
cd frontend

# Development
npm run dev

# Build
npm run build

# Production
npm start

# Testy
npm run test

# Linting
npm run lint

# Type checking
npm run type-check
```

### Baza danych:

```bash
# Połączenie
psql -U azure_user -d azure_solar

# Dump bazy
pg_dump -U azure_user azure_solar > backup.sql

# Restore bazy
psql -U azure_user azure_solar < backup.sql

# Reset (USUWA DANE!)
psql -U postgres -c "DROP DATABASE azure_solar;"
psql -U postgres -c "CREATE DATABASE azure_solar;"
psql -U postgres -c "GRANT ALL PRIVILEGES ON DATABASE azure_solar TO azure_user;"
```

---

## 📊 Sprawdzanie statusu

```bash
# Status aplikacji
make status

# Health check
curl http://localhost:5000/api/health

# Sprawdź czy działa
curl http://localhost:3000
curl http://localhost:5000

# Logi na żywo
make logs                 # Oba
make logs-backend         # Backend
make logs-frontend        # Frontend

# Procesy
make ps

# Porty
make ports
lsof -i :5000 -i :3000
```

---

## 🐛 Troubleshooting

```bash
# Port zajęty
lsof -ti:5000 | xargs kill -9
lsof -ti:3000 | xargs kill -9

# Reset cache
make clean

# Reset wszystkiego
make clean-all
make setup

# Reset bazy danych
make db-reset

# Reinstalacja zależności
rm -rf backend/venv frontend/node_modules
make install

# Sprawdź logi
tail -f backend.log
tail -f frontend.log

# Sprawdź błędy instalacji
cd backend && source venv/bin/activate && python run.py
cd frontend && npm run dev
```

---

## 🌐 URL-e i Credentials

### Aplikacja:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- Health Check: http://localhost:5000/api/health

### Panel Klienta:
- URL: http://localhost:3000/client/login
- Email: jan.kowalski@example.com
- Hasło: client123

### Panel Admina:
- URL: http://localhost:3000/admin/login
- Email: admin@azure-solar.pl
- Hasło: admin123

---

## 📚 Dokumentacja

```bash
# Lokalna
cat README.md
cat INSTALLATION.md
cat QUICKSTART.md
cat SETUP_GUIDE.md

# W przeglądarce
make docs
```

---

## ⚡ Najczęściej używane:

```bash
# 1. Instalacja (raz)
make setup

# 2. Uruchomienie
make start

# 3. Sprawdzenie statusu
make status

# 4. Logi
make logs

# 5. Zatrzymanie
make stop

# 6. Reset bazy (rozwój)
make db-reset

# 7. Clean cache
make clean
```

---

## 🎓 Aliasy Make

```bash
make i      # install
make s      # start
make r      # restart
make l      # logs
make c      # clean
make t      # test
make h      # help
```

---

## 🚀 Quick Start (jeden liner)

```bash
# Instalacja + uruchomienie
make quick

# LUB
make setup && make start
```

---

**💡 Tip**: Dodaj alias do `.zshrc` lub `.bashrc`:

```bash
alias azs='cd /Users/haos/azure-sold'
alias azstart='cd /Users/haos/azure-sold && make start'
alias azstop='cd /Users/haos/azure-sold && make stop'
alias azlogs='cd /Users/haos/azure-sold && make logs'
```

Potem możesz używać:
```bash
azs          # Przejdź do projektu
azstart      # Uruchom
azlogs       # Logi
azstop       # Zatrzymaj
```

---

**🎉 Gotowe! Masz kompletną referencję wszystkich komend!**
