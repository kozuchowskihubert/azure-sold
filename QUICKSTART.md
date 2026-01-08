# ☀️ Azure Solar - Quick Start Guide

Witaj w projekcie **Azure Solar**! Ten dokument pomoże Ci szybko uruchomić aplikację lokalnie.

## 📋 Wymagania

- **Node.js** 18+ ([pobierz](https://nodejs.org/))
- **Python** 3.11+ ([pobierz](https://www.python.org/downloads/))
- **PostgreSQL** 14+ ([pobierz](https://www.postgresql.org/download/))
- **Git** ([pobierz](https://git-scm.com/downloads))

## 🚀 Instalacja Lokalna

### 1. Klonowanie Repozytorium

```bash
git clone <repository-url>
cd azure-sold
```

### 2. Backend Setup (Python/Flask)

```bash
# Przejdź do katalogu backend
cd backend

# Stwórz wirtualne środowisko
python -m venv venv

# Aktywuj środowisko
# macOS/Linux:
source venv/bin/activate
# Windows:
venv\Scripts\activate

# Zainstaluj zależności
pip install -r requirements.txt

# Skonfiguruj środowisko
cp .env.example .env
# Edytuj .env z własnymi wartościami
nano .env

# Stwórz bazę danych PostgreSQL
createdb azure_solar
# Lub przez psql:
psql -U postgres -c "CREATE DATABASE azure_solar;"

# Zainicjalizuj bazę danych
python init_db.py

# Uruchom serwer
python run.py
```

Backend będzie dostępny na: **http://localhost:5002**

### 3. Frontend Setup (Next.js)

Otwórz nowe okno terminala:

```bash
cd frontend

# Zainstaluj zależności
npm install

# Skonfiguruj środowisko
cp .env.example .env.local
# Edytuj .env.local
nano .env.local

# Uruchom serwer deweloperski
npm run dev
```

Frontend będzie dostępny na: **http://localhost:3000**

## 🔐 Domyślne Dane Logowania

Po uruchomieniu `init_db.py`:

- **Admin**: admin@azure-solar.pl / admin123
- **Klient**: jan.kowalski@example.com / client123

## 📧 Konfiguracja Email (Gmail)

1. Włącz 2-Factor Authentication w Gmail
2. Wygeneruj App Password: https://myaccount.google.com/apppasswords
3. W pliku `backend/.env`:

```env
MAIL_SERVER=smtp.gmail.com
MAIL_PORT=587
MAIL_USE_TLS=True
MAIL_USERNAME=twoj-email@gmail.com
MAIL_PASSWORD=twoje-app-password
```

## 🧪 Testowanie

### Backend Tests

```bash
cd backend
pytest
```

### Frontend Tests

```bash
cd frontend
npm test
```

## 🌍 Główne Funkcje

### Dla Użytkowników
- 🏠 **Strona główna** - http://localhost:3000
- 🔢 **Kalkulator oszczędności** - http://localhost:3000#calculator
- 📸 **Portfolio** - http://localhost:3000#portfolio
- 📞 **Kontakt** - http://localhost:3000#contact

### Panel Klienta
- 🔐 **Login** - http://localhost:3000/client/login
- 📊 **Dashboard** - http://localhost:3000/client/dashboard
- 📋 **Moje projekty** - http://localhost:3000/client/projects

### Panel Administracyjny
- 🔐 **Login** - http://localhost:3000/admin/login
- 📊 **Dashboard** - http://localhost:3000/admin/dashboard
- 👥 **Klienci** - http://localhost:3000/admin/clients
- 📋 **Projekty** - http://localhost:3000/admin/projects

## 🐛 Rozwiązywanie Problemów

### Backend nie startuje

```bash
# Sprawdź czy PostgreSQL działa
psql -U postgres -c "SELECT version();"

# Sprawdź logi
tail -f logs/app.log
```

### Frontend nie łączy się z API

Sprawdź w `frontend/.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5002
```

### Błędy bazy danych

```bash
# Usuń i utwórz ponownie bazę
dropdb azure_solar
createdb azure_solar
cd backend
python init_db.py
```

### Błędy instalacji npm

```bash
# Wyczyść cache
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

## 📚 Dodatkowa Dokumentacja

- **Pełna dokumentacja**: [README.md](./README.md)
- **API Documentation**: [backend/README.md](./backend/README.md)
- **Terraform Guide**: [terraform/README.md](./terraform/README.md)
- **Frontend Guide**: [frontend/README.md](./frontend/README.md)

## 🚀 Deployment na Produkcję

Zobacz szczegóły w głównym [README.md](./README.md) sekcja "Deployment".

Skrócona wersja:

1. **Frontend (Vercel)**:
   ```bash
   cd frontend
   vercel deploy --prod
   ```

2. **Backend (Azure)**:
   ```bash
   cd terraform
   terraform apply -var-file="environments/prod/terraform.tfvars"
   ```

## 💡 Wskazówki

- Używaj **VS Code** z rozszerzeniami: Python, ESLint, Tailwind CSS IntelliSense
- Włącz **auto-save** w edytorze
- Używaj **Docker** dla łatwiejszego setupu (opcjonalnie)
- Skonfiguruj **Git hooks** dla automatycznego testowania

## 📞 Wsparcie

Problemy lub pytania?
- 📧 Email: support@azure-solar.pl
- 💬 Issues: GitHub Issues
- 📚 Docs: [/docs](./docs)

---

Powodzenia! ☀️
