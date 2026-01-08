# 🤖 Azure Solar - Automatyczna Instalacja

## 📦 Skrypty automatyzujące

Utworzyłem kompletne skrypty automatyzujące instalację i uruchomienie projektu.

---

## 🚀 Szybki Start

### macOS / Linux:

```bash
# 1. Nadaj uprawnienia do wykonywania
chmod +x setup.sh

# 2. Uruchom instalację
./setup.sh
```

Skrypt automatycznie:
- ✅ Sprawdzi wymagania (Node.js, Python, PostgreSQL)
- ✅ Utworzy bazę danych PostgreSQL
- ✅ Zainstaluje zależności Python (venv + pip)
- ✅ Zainstaluje zależności Node.js (npm)
- ✅ Wygeneruje bezpieczne klucze SECRET_KEY i JWT_SECRET_KEY
- ✅ Skonfiguruje pliki .env
- ✅ Zainicjalizuje bazę danych (seedowanie)
- ✅ Utworzy skrypty start.sh i stop.sh
- ✅ Opcjonalnie uruchomi aplikację

### Windows:

```cmd
# Uruchom jako Administrator
setup.bat
```

Skrypt automatycznie wykona te same kroki co wersja Linux/macOS.

---

## 🎮 Sterowanie aplikacją

Po zakończeniu instalacji:

### Uruchomienie:

**macOS/Linux:**
```bash
./start.sh
```

**Windows:**
```cmd
start.bat
```

### Zatrzymanie:

**macOS/Linux:**
```bash
./stop.sh
```

**Windows:**
```cmd
stop.bat
```

---

## 📊 Co robi skrypt setup.sh?

### 1. Sprawdzanie wymagań
```bash
✅ Node.js 18+
✅ Python 3.11+
✅ PostgreSQL 14+
```

### 2. Konfiguracja bazy danych
```sql
CREATE DATABASE azure_solar;
CREATE USER azure_user WITH PASSWORD 'twoje_haslo';
GRANT ALL PRIVILEGES ON DATABASE azure_solar TO azure_user;
```

### 3. Backend (Python)
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

Generuje `.env` z:
- Losowym `SECRET_KEY` (32 bajty)
- Losowym `JWT_SECRET_KEY` (32 bajty)
- Connection string do bazy
- Opcjonalnie: Gmail SMTP credentials

Inicjalizuje bazę:
```bash
python init_db.py
```

### 4. Frontend (Next.js)
```bash
cd frontend
npm install
cp .env.example .env.local
```

### 5. Skrypty uruchamiające

Tworzy `start.sh`:
- Uruchamia backend Flask w tle (port 5000)
- Uruchamia frontend Next.js w tle (port 3000)
- Sprawdza health check
- Wyświetla dostępy i credentials
- Zapisuje PID procesy

Tworzy `stop.sh`:
- Zatrzymuje procesy backend i frontend
- Czyści porty 5000 i 3000

---

## 🔧 Zaawansowane opcje

### Instalacja bez automatycznego uruchomienia:

**macOS/Linux:**
```bash
./setup.sh
# Na końcu wybierz 'n' gdy zapyta "Uruchomić teraz?"
```

### Reinstalacja (czysty start):

**macOS/Linux:**
```bash
# Usuń pliki konfiguracyjne
rm -rf backend/venv backend/.env
rm -rf frontend/node_modules frontend/.env.local
rm -rf .backend.pid .frontend.pid *.log

# Uruchom setup ponownie
./setup.sh
```

**Windows:**
```cmd
# Usuń foldery
rmdir /s /q backend\venv
rmdir /s /q frontend\node_modules
del backend\.env
del frontend\.env.local
del *.log

# Uruchom setup ponownie
setup.bat
```

### Tylko instalacja zależności (bez bazy):

**macOS/Linux:**
```bash
# Backend
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Frontend
cd ../frontend
npm install
```

---

## 📝 Logi

Po uruchomieniu aplikacja zapisuje logi:

```bash
# Backend logs
tail -f backend.log

# Frontend logs
tail -f frontend.log

# Oba jednocześnie
tail -f backend.log frontend.log
```

**Windows:**
```cmd
# Backend logs
type backend.log

# Frontend logs
type frontend.log
```

---

## ⚙️ Konfiguracja manualna

Jeśli wolisz ręczną konfigurację, zobacz [INSTALLATION.md](./INSTALLATION.md)

---

## 🐛 Troubleshooting

### Problem: "Permission denied"

**Rozwiązanie:**
```bash
chmod +x setup.sh start.sh stop.sh
```

### Problem: "psql: command not found"

**macOS:**
```bash
brew install postgresql@14
brew services start postgresql@14
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt-get install postgresql postgresql-contrib
sudo systemctl start postgresql
```

**Windows:**
```cmd
winget install PostgreSQL.PostgreSQL
```

### Problem: "Port 5000 already in use"

**macOS/Linux:**
```bash
# Znajdź proces
lsof -ti:5000

# Zabij proces
lsof -ti:5000 | xargs kill -9
```

**Windows:**
```cmd
# Znajdź proces
netstat -ano | findstr :5000

# Zabij proces (zastąp PID)
taskkill /PID <PID> /F
```

### Problem: "Database connection failed"

**Rozwiązanie:**
1. Sprawdź czy PostgreSQL działa:
   ```bash
   # macOS/Linux
   pg_isready
   
   # Windows
   pg_ctl status
   ```

2. Sprawdź credentials w `backend/.env`:
   ```env
   DATABASE_URL=postgresql://azure_user:HASLO@localhost:5432/azure_solar
   ```

3. Sprawdź połączenie ręcznie:
   ```bash
   psql -U azure_user -d azure_solar -h localhost
   ```

### Problem: Błędy instalacji npm

**Rozwiązanie:**
```bash
cd frontend
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

---

## 📦 Co zostanie zainstalowane?

### Backend (Python packages):
- Flask 3.0.0
- SQLAlchemy 2.0.23
- psycopg2-binary 2.9.9
- Flask-JWT-Extended 4.5.3
- Flask-Mail 0.9.1
- Flask-CORS 4.0.0
- Flask-Migrate 4.0.5
- python-dotenv 1.0.0
- bcrypt 4.1.2
- gunicorn 21.2.0

### Frontend (npm packages):
- next 14.1.0
- react 18.2.0
- react-dom 18.2.0
- next-intl 3.9.0
- @tanstack/react-query 5.17.19
- axios 1.6.5
- zod 3.22.4
- react-hook-form 7.49.3
- tailwindcss 3.4.1
- typescript 5.3.3
- lucide-react 0.309.0

---

## 🎯 Po instalacji

Aplikacja będzie dostępna pod:

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Health Check**: http://localhost:5000/api/health

### Konta testowe:

**Panel Klienta**: http://localhost:3000/client/login
- Email: `jan.kowalski@example.com`
- Hasło: `client123`

**Panel Admina**: http://localhost:3000/admin/login
- Email: `admin@azure-solar.pl`
- Hasło: `admin123`

---

## 📚 Następne kroki

1. ✅ Uruchom aplikację: `./start.sh` lub `start.bat`
2. ✅ Otwórz http://localhost:3000
3. ✅ Przetestuj formularze i kalkulatory
4. ✅ Zaloguj się do paneli
5. ✅ Sprawdź dokumentację API: http://localhost:5000/api/health
6. 🚧 Implementuj brakujące panele (client, admin)
7. 🚧 Dodaj autentykację JWT
8. 🚧 Skonfiguruj prawdziwy SMTP (Gmail)
9. 🚧 Deploy na Vercel + Azure

---

## 🌟 Wsparcie

Masz problem z instalacją? Sprawdź:

1. [INSTALLATION.md](./INSTALLATION.md) - Szczegółowa instrukcja
2. [QUICKSTART.md](./QUICKSTART.md) - Szybki start (PL)
3. [README.md](./README.md) - Główna dokumentacja
4. Logi: `tail -f backend.log frontend.log`

---

**🎉 Gotowe! Teraz możesz uruchomić Azure Solar jedną komendą!**
