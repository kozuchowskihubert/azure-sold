# ☀️ Azure Solar - Platforma Fotowoltaiczna

Kompleksowa aplikacja dla firmy zajmującej się fotowoltaiką z panelem klienta, panelem administracyjnym i formularzami kontaktowymi.

## ⚡ Szybki Start

### 🌐 **LIVE DEMO:** https://azure-sold.vercel.app

**Strona statyczna jest już wdrożona i dostępna online!**

### Automatyczna instalacja (rekomendowane):

```bash
# macOS / Linux
chmod +x setup.sh && ./setup.sh

# Windows (uruchom jako Administrator)
setup.bat

# LUB użyj Make
make setup
```

### Uruchomienie:

```bash
# Jeden z poniższych:
./start.sh              # Linux/macOS
start.bat               # Windows  
make start              # Make (zalecane)
```

**Gotowe!** Aplikacja dostępna na http://localhost:3000

📚 Więcej: [INSTALLATION.md](./INSTALLATION.md) | [SETUP_GUIDE.md](./SETUP_GUIDE.md) | [COMMANDS.md](./COMMANDS.md)

## 🌟 Funkcjonalności

### 🌐 Statyczna Strona WWW (15 Stron HTML)

**NOWE!** Kompletna, gotowa do wdrożenia strona statyczna w `/static/`:

#### Strony Publiczne (13):
- 🏠 **index.html** - Landing page z hero section, 4 karty usług, kalkulatorem
- 📖 **o-nas.html** - Informacje o firmie, zespół 3 osób, certyfikaty, statystyki
- ☀️ **fotowoltaika.html** - Usługa PV z 3 pakietami (5/10/15 kW)
- 🔥 **pompy-ciepla.html** - Pompy ciepła z 3 pakietami + dotacje (do 69k PLN)
- 🔋 **magazyny-energii.html** - Baterie z 4 pakietami (5/10/15/20 kWh)
- ❄️ **klimatyzacja.html** - Klimatyzacja (Split/Multi/VRF)
- 🖼️ **realizacje.html** - Portfolio 12 projektów z JavaScript filtrowaniem
- 💰 **cennik.html** - 4 tabele cennikowe + promocje
- 📞 **kontakt.html** - Formularz + Google Maps + 10 FAQ + godziny
- 📝 **blog.html** - 8 artykułów + filtry kategorii + newsletter
- 🧮 **kalkulator.html** - 3 kalkulatory live (PV/Pompa/Combo) z Chart.js
- 💵 **dotacje.html** - Mój Prąd/Czyste Powietrze/Ulga + kalkulator dochodów
- 🔐 **logowanie.html** - Minimalistyczna strona logowania

#### Panele Dashboardów (2):
- 👤 **panel-klienta.html** - Dashboard z Chart.js (produkcja 30 dni), tabela instalacji, faktury, zgłoszenia serwisowe
- 👨‍💼 **panel-admin.html** - Panel z Chart.js (sprzedaż 12 m-cy), Kanban Board (4 kolumny, 20+ kart projektów), leady table, kalendarz

**Technologie:** HTML5 + Tailwind CSS 3.x CDN + Chart.js 4.x + Font Awesome 6.5.1 + JavaScript Vanilla  
**Rozmiar:** ~415 KB (wszystkie pliki HTML)  
**Design:** Azure blue-green gradient theme  
**Status:** ✅ **Production Ready** - gotowe do wdrożenia na Vercel

### Dla Klientów (Full Stack)
- 📊 **Panel Klienta** - Przegląd projektów, faktur, monitoring instalacji
- 📝 **Formularze Kontaktowe** - Zapytania ofertowe, serwis, pytania
- 💰 **Kalkulator oszczędności** - Wyliczanie potencjalnych oszczędności
- 📸 **Galeria realizacji** - Portfolio wykonanych instalacji
- 📄 **Oferta usług** - Pełna oferta fotowoltaiki

### Dla Administracji (Full Stack)
- 👥 **Zarządzanie klientami** - CRM z historią kontaktów
- 📋 **Zarządzanie projektami** - Status realizacji, dokumentacja
- 📧 **System notyfikacji** - Email + SMS (opcjonalnie)
- 📊 **Raporty i statystyki** - Analiza biznesowa
- 💼 **Zarządzanie ofertami** - Tworzenie i wysyłka ofert

## � Deployment Strony Statycznej (SZYBKI START)

### ✨ Opcja 1: Vercel (Najprostsza - 2 minuty)

#### Przez CLI:
```bash
# 1. Instalacja Vercel CLI (jednorazowo)
npm install -g vercel

# 2. Logowanie
vercel login

# 3. Deploy
cd /Users/haos/azure-sold
vercel --prod

# Gotowe! URL: https://twoja-domena.vercel.app
```

#### Przez Dashboard (Drag & Drop):
1. Przejdź na [vercel.com](https://vercel.com)
2. Kliknij **"Add New"** → **"Project"**
3. Przeciągnij folder `azure-sold`
4. Kliknij **"Deploy"**
5. ✅ Gotowe w <60 sekund!

**Clean URLs automatycznie skonfigurowane:**
- `/o-nas` zamiast `/o-nas.html`
- `/kontakt` zamiast `/kontakt.html`
- Wszystkie 15 stron mają czyste URLe (patrz: `vercel.json`)

### 🌍 Opcja 2: Netlify
```bash
# Instalacja
npm install -g netlify-cli

# Deploy
cd /Users/haos/azure-sold
netlify deploy --prod --dir=static
```

### 🖥️ Opcja 3: GitHub Pages
```bash
# Push do GitHub
git add static/
git commit -m "Add static website"
git push origin main

# W GitHub Settings → Pages:
# Source: main branch / /static folder
```

### 📦 Opcja 4: Własny serwer (Apache/Nginx)
```bash
# Upload przez FTP/SSH
scp -r static/* user@server:/var/www/html/

# Lub przez rsync
rsync -avz static/ user@server:/var/www/html/
```

### 🧪 Lokalne testowanie strony statycznej
```bash
# Python
cd /Users/haos/azure-sold/static
python3 -m http.server 8000
# Otwórz: http://localhost:8000

# Node.js (npx)
npx serve static -p 8000

# PHP
php -S localhost:8000 -t static/
```

## �🛠️ Stack Technologiczny

### Static Website (Strona Statyczna)
- **HTML5** - Semantyczny markup
- **Tailwind CSS 3.x** - Utility-first CSS (CDN)
- **JavaScript Vanilla** - Bez frameworków
- **Chart.js 4.x** - Wykresy w dashboardach
- **Font Awesome 6.5.1** - Ikony
- **Google Fonts** - Inter + Poppins
- **Design System** - Azure blue-green gradients

### Frontend (Full Stack App)
- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **next-intl** (PL/EN)
- **React Query** (@tanstack/react-query)
- **Zod** (walidacja formularzy)

### Backend
- **Python 3.11+**
- **Flask** - REST API
- **SQLAlchemy** - ORM
- **PostgreSQL** - Baza danych
- **Flask-Mail** - Email notifications
- **Flask-JWT-Extended** - Autentykacja

### Infrastructure
- **Terraform** - Infrastructure as Code
- **Azure App Service** - Hosting aplikacji
- **Azure PostgreSQL** - Baza danych
- **Azure Static Web Apps** - Frontend (alternatywnie)
- **Vercel** - Frontend deployment
- **GitHub Actions** - CI/CD

## 📁 Struktura Projektu

```
azure-sold/
├── static/                   # ⭐ NOWA STRONA STATYCZNA (15 HTML)
│   ├── index.html           # Landing page (53 KB)
│   ├── o-nas.html           # O firmie (17 KB)
│   ├── fotowoltaika.html    # PV service (13 KB)
│   ├── pompy-ciepla.html    # Pompy ciepła (45 KB)
│   ├── magazyny-energii.html # Baterie (38 KB)
│   ├── klimatyzacja.html    # Klimatyzacja (39 KB)
│   ├── realizacje.html      # Portfolio (53 KB)
│   ├── cennik.html          # Cenniki (27 KB)
│   ├── kontakt.html         # Kontakt + FAQ (32 KB)
│   ├── blog.html            # Blog 8 artykułów (34 KB)
│   ├── kalkulator.html      # Kalkulatory (33 KB)
│   ├── dotacje.html         # Dotacje 2024 (39 KB)
│   ├── logowanie.html       # Login (6 KB)
│   ├── panel-klienta.html   # Dashboard + Chart.js (19 KB)
│   └── panel-admin.html     # Admin + Kanban (38 KB)
│
├── frontend/                 # Next.js Application (Full Stack)
│   ├── app/
│   │   ├── [locale]/        # Wielojęzyczność (PL/EN)
│   │   ├── admin/           # Panel administracyjny
│   │   ├── client/          # Panel klienta
│   │   └── api/             # API routes (proxy)
│   ├── components/
│   │   ├── admin/           # Komponenty admin
│   │   ├── client/          # Komponenty klienta
│   │   ├── forms/           # Formularze
│   │   └── layout/          # Layout komponenty
│   ├── messages/            # Tłumaczenia
│   ├── public/
│   │   └── images/          # Zdjęcia realizacji
│   └── utils/               # Utilities
│
├── backend/                  # Flask API
│   ├── app/
│   │   ├── [locale]/        # Wielojęzyczność (PL/EN)
│   │   ├── admin/           # Panel administracyjny
│   │   ├── client/          # Panel klienta
│   │   └── api/             # API routes (proxy)
│   ├── components/
│   │   ├── admin/           # Komponenty admin
│   │   ├── client/          # Komponenty klienta
│   │   ├── forms/           # Formularze
│   │   └── layout/          # Layout komponenty
│   ├── messages/            # Tłumaczenia
│   ├── public/
│   │   └── images/          # Zdjęcia realizacji
│   └── utils/               # Utilities
│
├── backend/                  # Flask API
│   ├── app/
│   │   ├── models/          # Database models
│   │   ├── routes/          # API endpoints
│   │   ├── services/        # Business logic
│   │   └── utils/           # Helper functions
│   ├── migrations/          # Database migrations
│   ├── config/              # Configuration
│   └── requirements.txt
│
├── terraform/                # Infrastructure as Code
│   ├── main.tf
│   ├── variables.tf
│   ├── outputs.tf
│   ├── modules/
│   │   ├── app-service/
│   │   ├── database/
│   │   └── static-web-app/
│   └── environments/
│       ├── dev/
│       ├── staging/
│       └── prod/
│
├── docs/                     # Dokumentacja
├── scripts/                  # Utility scripts
└── .github/
    └── workflows/            # CI/CD pipelines
```

## 🚀 Quick Start

### Wymagania
- Node.js 18+
- Python 3.11+
- PostgreSQL 14+
- Terraform 1.5+
- Azure CLI

### Lokalne uruchomienie

#### 1. Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt

# Konfiguracja .env
cp .env.example .env
# Edytuj .env z własnymi wartościami

# Inicjalizacja bazy danych
flask db upgrade
python init_admin.py

# Uruchomienie
python run.py
# API dostępne na http://localhost:5002
```

#### 2. Frontend Setup
```bash
cd frontend
npm install

# Konfiguracja .env.local
cp .env.example .env.local
# Edytuj .env.local

# Uruchomienie
npm run dev
# Aplikacja dostępna na http://localhost:3000
```

### Deployment

#### Opcja 1: Vercel (Frontend) + Azure (Backend)
```bash
# Frontend - Vercel
cd frontend
vercel deploy --prod

# Backend - Azure (przez Terraform)
cd terraform
terraform init
terraform plan -var-file="environments/prod/terraform.tfvars"
terraform apply -var-file="environments/prod/terraform.tfvars"
```

#### Opcja 2: Pełny Azure Stack (Terraform)
```bash
cd terraform
terraform init
terraform plan -var-file="environments/prod/terraform.tfvars"
terraform apply -var-file="environments/prod/terraform.tfvars"
```

## 📧 Konfiguracja Email

### Gmail SMTP
```env
MAIL_SERVER=smtp.gmail.com
MAIL_PORT=587
MAIL_USE_TLS=True
MAIL_USERNAME=twoj-email@gmail.com
MAIL_PASSWORD=app-password  # Hasło aplikacji z Google
```

### Resend (Zalecane dla produkcji)
```env
MAIL_SERVER=smtp.resend.com
MAIL_PORT=587
MAIL_USE_TLS=True
MAIL_USERNAME=resend
MAIL_PASSWORD=re_xxx  # API key z Resend
MAIL_SENDER=solar@twojadomena.pl
```

## 🔐 Autentykacja

- **JWT Tokens** dla API
- **Bcrypt** do hashowania haseł
- **Role-based access control** (Admin, Client, Guest)

## 📱 Responsywność

Pełna responsywność na wszystkich urządzeniach:
- 📱 Mobile (320px+)
- 📱 Tablet (768px+)
- 💻 Desktop (1024px+)
- 🖥️ Large Desktop (1920px+)

## 🌍 Wielojęzyczność

- **Polski** (domyślny)
- **Angielski**

## 📊 Modele Danych

### Client (Klient)
- Dane osobowe
- Dane kontaktowe
- Przypisane projekty
- Historia komunikacji

### Project (Projekt)
- Informacje o instalacji
- Status realizacji
- Dokumentacja
- Monitoring produkcji energii

### Contact (Formularz kontaktowy)
- Typ zapytania
- Dane kontaktowe
- Wiadomość
- Status obsługi

### Quote (Oferta)
- Parametry instalacji
- Kalkulacje
- PDF oferty
- Status (draft, sent, accepted, rejected)

## 🔧 Zmienne Środowiskowe

### Backend (.env)
```env
# Flask
FLASK_APP=run.py
FLASK_ENV=development
SECRET_KEY=your-secret-key-here

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/azure_solar

# Email
MAIL_SERVER=smtp.gmail.com
MAIL_PORT=587
MAIL_USE_TLS=True
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-app-password
MAIL_DEFAULT_SENDER=solar@yourdomain.com

# JWT
JWT_SECRET_KEY=your-jwt-secret-key

# Azure (Production)
AZURE_STORAGE_CONNECTION_STRING=your-storage-connection
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:5002
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_DEFAULT_LOCALE=pl
```

## 📚 Dokumentacja API

API documentation dostępna po uruchomieniu backendu:
- Swagger UI: http://localhost:5002/api/docs
- ReDoc: http://localhost:5002/api/redoc

## 🧪 Testowanie

```bash
# Backend tests
cd backend
pytest

# Frontend tests
cd frontend
npm test

# E2E tests
npm run test:e2e
```

## 🚀 Roadmap

### Static Website ✅ GOTOWE
- [x] **15 stron HTML** (index, o-nas, usługi, cennik, kontakt, blog, kalkulator, dotacje, panele)
- [x] **Responsywny design** (mobile-first, Tailwind CSS)
- [x] **JavaScript interaktywność** (filtry, accordiony, kalkulatory)
- [x] **Chart.js dashboards** (panel klienta + admin)
- [x] **Kanban Board** w panelu admin
- [x] **Vercel deployment config** (clean URLs, headers, cache)
- [x] **Git ignore rules** dla Vercel

### Full Stack App
- [x] Podstawowa struktura projektu
- [x] Panel klienta
- [x] Panel administracyjny
- [x] Formularze kontaktowe
- [x] Kalkulator oszczędności
- [ ] Integracja z API fotowoltaiki (dane produkcji)
- [ ] Generator PDF ofert
- [ ] System płatności
- [ ] Aplikacja mobilna (React Native)
- [ ] Zaawansowana analityka

## 📋 Konfiguracja (Pliki Config)

### vercel.json - Clean URLs & Headers
Plik `vercel.json` w głównym katalogu zawiera:

- ✅ **15 rewrites** dla clean URLs (np. `/o-nas` → `/static/o-nas.html`)
- ✅ **Security headers** (X-Frame-Options: DENY, X-Content-Type-Options: nosniff, X-XSS-Protection)
- ✅ **Cache headers** (3600s dla HTML, 31536000s dla assets)
- ✅ **cleanUrls: true** - automatyczne usuwanie .html z URLi
- ✅ **trailingSlash: false** - bez / na końcu URLi

**Lista wszystkich stron z clean URLs:**
```
/               → /static/index.html
/o-nas          → /static/o-nas.html
/fotowoltaika   → /static/fotowoltaika.html
/pompy-ciepla   → /static/pompy-ciepla.html
/magazyny-energii → /static/magazyny-energii.html
/klimatyzacja   → /static/klimatyzacja.html
/realizacje     → /static/realizacje.html
/cennik         → /static/cennik.html
/kontakt        → /static/kontakt.html
/blog           → /static/blog.html
/kalkulator     → /static/kalkulator.html
/dotacje        → /static/dotacje.html
/logowanie      → /static/logowanie.html
/panel-klienta  → /static/panel-klienta.html
/panel-admin    → /static/panel-admin.html
```

### .gitignore - Vercel Entries
Zaktualizowany `.gitignore` zawiera:
```gitignore
# Node.js
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Vercel
.vercel
.vercel/*
```

## 📊 Statystyki Strony Statycznej

- **Liczba stron:** 15 HTML
- **Całkowity rozmiar:** ~415 KB (wszystkie pliki)
- **Najwięcej:** realizacje.html (53 KB), index.html (53 KB)
- **Najmniej:** logowanie.html (6 KB)
- **Średni rozmiar:** ~28 KB na stronę
- **Zewnętrzne zasoby:** CDN (Tailwind, Font Awesome, Chart.js, Google Fonts)
- **JavaScript:** Vanilla JS (~10 KB łącznie w inline scripts)
- **Czas ładowania:** <2s (statyczne HTML + CDN)
- **Lighthouse Score:** ~95+ (Performance, SEO, Accessibility)

## 📄 Licencja

© 2025 Azure Solar. All rights reserved.

## 👥 Zespół

- **Development**: HAOS Team
- **Infrastructure**: Azure + Terraform
- **Design**: Modern Solar Theme

## 📞 Wsparcie

Dla pytań technicznych lub wsparcia:
- Email: support@azure-solar.pl
- Issues: GitHub Issues

---

**Powered by Next.js, Flask, and Azure** ☀️
