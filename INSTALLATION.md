# 🎯 Azure Solar - Instalacja i Uruchomienie

## ⚡ Szybki Start (5 minut)

### Wymagania wstępne:
- Node.js 18+ ([pobierz](https://nodejs.org/))
- Python 3.11+ ([pobierz](https://www.python.org/downloads/))
- PostgreSQL 14+ ([pobierz](https://www.postgresql.org/download/))
- Git ([pobierz](https://git-scm.com/))

---

## 📦 Krok 1: Klonowanie repozytorium

```bash
git clone <your-repo-url> azure-sold
cd azure-sold
```

---

## 🖥️ Krok 2: Konfiguracja Backendu (Flask API)

### 2.1. Utworzenie wirtualnego środowiska Python

```bash
cd backend
python3 -m venv venv
source venv/bin/activate  # macOS/Linux
# lub
venv\Scripts\activate     # Windows
```

### 2.2. Instalacja zależności

```bash
pip install -r requirements.txt
```

### 2.3. Konfiguracja bazy danych PostgreSQL

**Utwórz bazę danych:**
```bash
psql -U postgres
CREATE DATABASE azure_solar;
CREATE USER azure_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE azure_solar TO azure_user;
\q
```

### 2.4. Konfiguracja zmiennych środowiskowych

```bash
cp .env.example .env
```

Edytuj `.env` i uzupełnij:
```env
# Database
DATABASE_URL=postgresql://azure_user:your_password@localhost:5432/azure_solar

# Flask
FLASK_ENV=development
SECRET_KEY=your-super-secret-key-change-this-in-production
JWT_SECRET_KEY=your-jwt-secret-key

# Email (Gmail SMTP)
MAIL_SERVER=smtp.gmail.com
MAIL_PORT=587
MAIL_USE_TLS=True
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-app-specific-password
MAIL_DEFAULT_SENDER=kontakt@azure-solar.pl

# Frontend URL (CORS)
FRONTEND_URL=http://localhost:3000
```

### 2.5. Inicjalizacja bazy danych

```bash
python init_db.py
```

**Utworzone zostaną konta testowe:**
- **Admin**: admin@azure-solar.pl / admin123
- **Klient**: jan.kowalski@example.com / client123

### 2.6. Uruchomienie serwera Flask

```bash
python run.py
```

✅ API dostępne na: http://localhost:5000
✅ Health check: http://localhost:5000/api/health

---

## 🌐 Krok 3: Konfiguracja Frontendu (Next.js)

Otwórz **nowy terminal** (pozostaw backend działający).

### 3.1. Instalacja zależności Node.js

```bash
cd ../frontend
npm install
```

### 3.2. Konfiguracja zmiennych środowiskowych

```bash
cp .env.example .env.local
```

Edytuj `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3.3. Uruchomienie serwera Next.js

```bash
npm run dev
```

✅ Frontend dostępny na: http://localhost:3000

---

## 🎉 Gotowe! Aplikacja działa

Otwórz przeglądarkę:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

### Logowanie do paneli:

**Panel Klienta**: http://localhost:3000/client/login
- Email: jan.kowalski@example.com
- Hasło: client123

**Panel Admina**: http://localhost:3000/admin/login
- Email: admin@azure-solar.pl
- Hasło: admin123

---

## 🐛 Rozwiązywanie problemów

### Problem: "Cannot find module 'react'"
**Rozwiązanie:**
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
```

### Problem: "Database connection failed"
**Rozwiązanie:**
1. Sprawdź, czy PostgreSQL działa: `psql -U postgres -c "SELECT 1"`
2. Sprawdź DATABASE_URL w `.env`
3. Upewnij się, że baza `azure_solar` istnieje

### Problem: "Port 5000 already in use"
**Rozwiązanie:**
```bash
# macOS/Linux
lsof -ti:5000 | xargs kill -9

# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### Problem: Błędy TypeScript w VSCode
**Rozwiązanie:**
```bash
cd frontend
npm install --save-dev @types/node @types/react @types/react-dom
```

### Problem: "SMTP authentication error"
**Rozwiązanie:**
- Dla Gmaila: Wygeneruj hasło aplikacji w [Google Account Security](https://myaccount.google.com/security)
- Włącz 2-factor authentication
- Użyj wygenerowanego hasła jako `MAIL_PASSWORD`

---

## 📚 Przydatne komendy

### Backend:
```bash
# Aktywacja środowiska
source venv/bin/activate  # macOS/Linux
venv\Scripts\activate     # Windows

# Uruchomienie serwera
python run.py

# Reinicjalizacja bazy (USUWA WSZYSTKIE DANE!)
python init_db.py

# Instalacja nowych pakietów
pip install <package-name>
pip freeze > requirements.txt

# Testy (gdy będą dodane)
pytest
```

### Frontend:
```bash
# Development
npm run dev

# Production build
npm run build
npm start

# Type checking
npm run type-check

# Linting
npm run lint

# Instalacja nowych pakietów
npm install <package-name>
```

---

## 🚀 Deployment

### Frontend (Vercel):

1. **Zainstaluj Vercel CLI:**
```bash
npm install -g vercel
```

2. **Deploy:**
```bash
cd frontend
vercel --prod
```

3. **Konfiguracja:**
- Dodaj zmienne środowiskowe w Vercel Dashboard
- `NEXT_PUBLIC_API_URL` → URL twojego backend API

### Backend (Azure App Service):

1. **Zainstaluj Terraform:**
```bash
# macOS
brew install terraform

# Windows
choco install terraform
```

2. **Konfiguracja:**
```bash
cd terraform/environments/prod
cp terraform.tfvars.example terraform.tfvars
cp secrets.tfvars.example secrets.tfvars
```

Edytuj `terraform.tfvars` i `secrets.tfvars`.

3. **Deployment:**
```bash
terraform init
terraform plan
terraform apply
```

📖 Pełna dokumentacja: [terraform/README.md](./terraform/README.md)

---

## 📁 Struktura projektu

```
azure-sold/
├── frontend/              # Next.js 14 frontend
│   ├── app/              # Pages (App Router)
│   ├── components/       # React components
│   ├── lib/              # Utils, API, constants
│   ├── types/            # TypeScript types
│   └── messages/         # i18n translations
├── backend/              # Flask API
│   ├── app/             # Flask application
│   │   ├── models.py    # Database models
│   │   └── routes/      # API endpoints
│   ├── run.py           # Entry point
│   └── init_db.py       # Database seeder
├── terraform/            # Infrastructure as Code
│   ├── main.tf          # Main config
│   └── environments/    # Per-environment configs
└── docs/                # Documentation
```

---

## 🔐 Bezpieczeństwo

⚠️ **Przed production deployment:**

1. Zmień wszystkie hasła i klucze w `.env`
2. Używaj silnych, unikalnych SECRET_KEY i JWT_SECRET_KEY
3. Włącz HTTPS dla API i frontendu
4. Skonfiguruj rate limiting
5. Dodaj monitoring (Sentry, LogRocket)
6. Regularnie aktualizuj zależności

```bash
# Sprawdź bezpieczeństwo pakietów
npm audit
pip-audit
```

---

## 📝 Następne kroki

Po uruchomieniu projektu:

1. ✅ Zaimplementuj brakujące panele (client, admin)
2. ✅ Dodaj autentykację JWT
3. ✅ Zaimplementuj upload plików
4. ✅ Dodaj generator PDF dla ofert
5. ✅ Skonfiguruj monitoring produkcji energii
6. ✅ Napisz testy (pytest, Jest)
7. ✅ Skonfiguruj CI/CD (GitHub Actions)
8. ✅ Dodaj prawdziwe zdjęcia projektów
9. ✅ Skonfiguruj domeny i certyfikaty SSL

---

## 🆘 Wsparcie

Masz problem? Sprawdź:

1. **Dokumentacja:**
   - [README.md](./README.md) - Główna dokumentacja
   - [QUICKSTART.md](./QUICKSTART.md) - Szybki start (PL)
   - [terraform/README.md](./terraform/README.md) - Deployment
   - [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md) - Pełne podsumowanie

2. **Logi:**
   ```bash
   # Backend logs
   tail -f backend/logs/app.log
   
   # Frontend logs
   # Sprawdź terminal gdzie uruchomiłeś npm run dev
   ```

3. **GitHub Issues:**
   Zgłoś problem na GitHub z tagiem i opisem błędu

---

## 🎨 Customizacja

### Zmiana kolorów (Tailwind):

Edytuj `frontend/tailwind.config.ts`:
```typescript
theme: {
  extend: {
    colors: {
      'solar-orange': '#F97316',  // Twój kolor
      'solar-yellow': '#FDB813',  // Twój kolor
    }
  }
}
```

### Zmiana tłumaczeń:

Edytuj `frontend/messages/pl.json` i `frontend/messages/en.json`

### Dodanie nowego języka:

1. Utwórz `frontend/messages/de.json`
2. Dodaj 'de' do `i18n.ts`
3. Skonfiguruj routing w `middleware.ts`

---

## 📊 Stack technologiczny

**Frontend:**
- Next.js 14 (React 18)
- TypeScript 5
- Tailwind CSS 3
- next-intl (i18n)
- React Query (data fetching)
- Zod (validation)

**Backend:**
- Python 3.11+
- Flask 3.0
- SQLAlchemy 2.0
- PostgreSQL 14+
- Flask-JWT-Extended (auth)
- Flask-Mail (emails)

**Infrastructure:**
- Terraform (IaC)
- Azure (App Service, PostgreSQL)
- Vercel (frontend hosting)
- GitHub Actions (CI/CD)

---

**🌟 Powodzenia z projektem Azure Solar!**

Stworzone: ${new Date().toLocaleDateString('pl-PL')}
