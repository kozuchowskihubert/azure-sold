# 🚀 Deployment Guide - Azure Solar

## ✅ Status Builda

**Build Date:** 8 stycznia 2026  
**Build Status:** ✅ SUCCESS  
**Next.js Version:** 14.1.0  
**Output Mode:** `standalone` (optimized for Vercel)  

---

## 📦 Build Output

```
Route (app)                              Size     First Load JS
┌ ○ /_not-found                          882 B          85.1 kB
└ λ /[locale]                            34.3 kB         119 kB
+ First Load JS shared by all            84.2 kB
  ├ chunks/69-99377b6db6a9769e.js        28.9 kB
  ├ chunks/fd9d1056-8274383bafd9d60d.js  53.4 kB
  └ other shared chunks (total)          1.9 kB

ƒ Middleware                             63.1 kB
```

**Total First Load JS:** 119 kB (excellent!)  
**Middleware Size:** 63.1 kB (for i18n routing)

---

## 🌐 Deployment Options

### Option 1: Vercel (Recommended - Zero Config)

#### Automatic Deployment:

```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Deploy (from project root)
cd /Users/haos/azure-sold
vercel

# Follow prompts:
# - Link to existing project? No
# - What's your project's name? azure-solar
# - In which directory is your code located? ./frontend
# - Want to override settings? No

# 3. Deploy to production
vercel --prod
```

#### Environment Variables (set in Vercel Dashboard):

```env
NEXT_PUBLIC_API_URL=https://your-backend-url.azurewebsites.net/api
NEXT_PUBLIC_SITE_URL=https://azure-solar.vercel.app
NEXT_PUBLIC_DEFAULT_LOCALE=pl
```

#### Vercel Configuration (already in vercel.json):

```json
{
  "version": 2,
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "regions": ["fra1"],
  "env": {
    "NEXT_PUBLIC_API_URL": "@api_url"
  },
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "https://your-backend.azurewebsites.net/api/:path*"
    }
  ]
}
```

**Deployment Time:** ~2 minutes  
**URL Format:** `https://azure-solar-xxx.vercel.app`

---

### Option 2: Azure Static Web Apps

#### Using GitHub Actions:

1. **Push kod do GitHub:**

```bash
cd /Users/haos/azure-sold
git init
git add .
git commit -m "Initial commit - Azure Solar"
git remote add origin https://github.com/your-username/azure-solar.git
git push -u origin main
```

2. **Create Azure Static Web App:**

```bash
# Via Azure Portal or CLI
az staticwebapp create \
  --name azure-solar \
  --resource-group azure-solar-rg \
  --source https://github.com/your-username/azure-solar \
  --location westeurope \
  --branch main \
  --app-location "/frontend" \
  --api-location "/backend" \
  --output-location ".next"
```

3. **GitHub Actions Workflow** (`.github/workflows/azure-static-web-apps.yml`):

```yaml
name: Azure Static Web Apps CI/CD

on:
  push:
    branches:
      - main
  pull_request:
    types: [opened, synchronize, reopened, closed]
    branches:
      - main

jobs:
  build_and_deploy_job:
    runs-on: ubuntu-latest
    name: Build and Deploy Job
    steps:
      - uses: actions/checkout@v3

      - name: Build And Deploy
        uses: Azure/static-web-apps-deploy@v1
        with:
          azure_static_web_apps_api_token: ${{ secrets.AZURE_STATIC_WEB_APPS_API_TOKEN }}
          repo_token: ${{ secrets.GITHUB_TOKEN }}
          action: "upload"
          app_location: "/frontend"
          api_location: "/backend"
          output_location: ".next"
```

**Deployment Time:** ~5 minutes  
**URL Format:** `https://azure-solar.azurestaticapps.net`

---

### Option 3: Custom Server (Docker)

#### Dockerfile dla Standalone Build:

```dockerfile
# frontend/Dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

#### Build & Run:

```bash
cd /Users/haos/azure-sold/frontend

# Build image
docker build -t azure-solar-frontend .

# Run container
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_API_URL=http://localhost:5001/api \
  azure-solar-frontend
```

---

## 🐍 Backend Deployment (Azure App Service)

### Terraform Already Configured!

```bash
cd /Users/haos/azure-sold/terraform/environments/prod

# Initialize
terraform init

# Plan
terraform plan

# Apply
terraform apply
```

**Resources Created:**
- Azure App Service (Linux, Python 3.9, B1 tier)
- Azure Database for PostgreSQL Flexible Server
- Azure Storage Account
- Application Insights

**Deployment Time:** ~10 minutes  
**Backend URL:** `https://azure-solar-backend.azurewebsites.net`

---

## 🔧 Post-Deployment Configuration

### 1. Update Frontend Environment Variables:

In Vercel Dashboard → Settings → Environment Variables:

```env
NEXT_PUBLIC_API_URL=https://azure-solar-backend.azurewebsites.net/api
NEXT_PUBLIC_SITE_URL=https://azure-solar.vercel.app
```

### 2. Update Backend CORS:

In `/backend/app/__init__.py`:

```python
CORS(app, origins=[
    'https://azure-solar.vercel.app',
    'https://azure-solar-backend.azurewebsites.net',
    'http://localhost:3000',
])
```

### 3. Database Migration:

```bash
# SSH to Azure App Service
az webapp ssh --name azure-solar-backend --resource-group azure-solar-rg

# Run migration
cd /home/site/wwwroot
source venv/bin/activate
python init_db.py
```

---

## 🧪 Testing Deployment

### Health Checks:

```bash
# Backend
curl https://azure-solar-backend.azurewebsites.net/api/health

# Frontend
curl -I https://azure-solar.vercel.app
```

### Performance Testing:

```bash
# Lighthouse CI
npm install -g @lhci/cli
lhci autorun --collect.url=https://azure-solar.vercel.app
```

---

## 📊 Monitoring

### Vercel Analytics:

- Automatically enabled in Vercel Dashboard
- Shows: Page views, visitors, top pages, devices

### Azure Application Insights:

```bash
# View logs
az monitor app-insights metrics show \
  --app azure-solar-backend \
  --resource-group azure-solar-rg \
  --metric requests/count
```

---

## 🔄 CI/CD Pipeline

### GitHub Actions Workflow:

Create `.github/workflows/main.yml`:

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      - name: Install dependencies
        run: cd frontend && npm ci
      - name: Type check
        run: cd frontend && npm run type-check
      - name: Lint
        run: cd frontend && npm run lint
      - name: Build
        run: cd frontend && npm run build

  test-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Python
        uses: actions/setup-python@v4
        with:
          python-version: '3.9'
      - name: Install dependencies
        run: cd backend && pip install -r requirements.txt
      - name: Lint
        run: cd backend && flake8 app/
      - name: Test
        run: cd backend && pytest

  deploy-vercel:
    needs: [test-frontend, test-backend]
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          working-directory: ./frontend
```

---

## 🎯 Quick Deployment Checklist

- [ ] Build passes locally (`npm run build`)
- [ ] All environment variables configured
- [ ] Backend deployed to Azure
- [ ] Database initialized with data
- [ ] Frontend deployed to Vercel
- [ ] CORS configured correctly
- [ ] Custom domain configured (optional)
- [ ] SSL/HTTPS enabled
- [ ] Monitoring enabled
- [ ] Error tracking configured (Sentry optional)

---

## 🚀 One-Command Deployment

Add to `Makefile`:

```makefile
deploy-all: deploy-backend deploy-vercel
\t@echo "✅ Full deployment complete!"

deploy-backend:
\t@echo "🐍 Deploying backend to Azure..."
\tcd terraform/environments/prod && terraform apply -auto-approve

deploy-vercel:
\t@echo "🌐 Deploying frontend to Vercel..."
\tcd frontend && vercel --prod
```

Usage:

```bash
make deploy-all
```

---

## 📝 Rollback Strategy

### Frontend Rollback (Vercel):

```bash
# List deployments
vercel ls

# Rollback to previous
vercel rollback <deployment-url>
```

### Backend Rollback (Azure):

```bash
# Via deployment slots
az webapp deployment slot swap \
  --name azure-solar-backend \
  --resource-group azure-solar-rg \
  --slot staging \
  --target-slot production
```

---

## 🎉 Success Metrics

**Build Size:** 119 kB First Load JS ✅ (< 200 kB target)  
**Lighthouse Score Target:** > 90 for all metrics  
**Load Time Target:** < 2s  
**API Response Time:** < 500ms  

---

**Created:** 8 stycznia 2026  
**Status:** ✅ Ready for Production Deployment  
**Next Steps:** Run `vercel` to deploy!
