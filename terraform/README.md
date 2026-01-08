# Terraform Infrastructure Documentation

## Overview

This directory contains Terraform configurations for deploying Azure Solar infrastructure to Microsoft Azure.

## Architecture

```
┌─────────────────────────────────────┐
│   Frontend (Vercel/Azure SWA)       │
│   - Next.js 14                      │
│   - TypeScript                      │
│   - Tailwind CSS                    │
└─────────────────────────────────────┘
              │
              │ HTTPS/REST
              ▼
┌─────────────────────────────────────┐
│   Backend API (Azure App Service)   │
│   - Flask Python 3.11               │
│   - Gunicorn WSGI                   │
│   - JWT Authentication              │
└─────────────────────────────────────┘
              │
              ├──────────────┬──────────────┐
              ▼              ▼              ▼
    ┌──────────────┐  ┌──────────┐  ┌──────────────┐
    │ PostgreSQL   │  │  Email   │  │   Storage    │
    │   Flexible   │  │  SMTP    │  │   Account    │
    │   Server     │  │          │  │  (Documents) │
    └──────────────┘  └──────────┘  └──────────────┘
```

## Prerequisites

- [Terraform](https://www.terraform.io/downloads.html) >= 1.5.0
- [Azure CLI](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli)
- Azure subscription
- Appropriate permissions to create resources

## Quick Start

### 1. Login to Azure

```bash
az login
az account set --subscription "Your-Subscription-Name"
```

### 2. Create Terraform Backend (One-time setup)

```bash
# Create resource group for Terraform state
az group create --name rg-solar-terraform-state --location westeurope

# Create storage account
az storage account create \
  --name solarterraformstate \
  --resource-group rg-solar-terraform-state \
  --location westeurope \
  --sku Standard_LRS

# Create container
az storage container create \
  --name tfstate \
  --account-name solarterraformstate
```

### 3. Configure Variables

```bash
cd terraform/environments/prod

# Copy example files
cp terraform.tfvars.example terraform.tfvars
cp secrets.tfvars.example secrets.tfvars

# Edit with your values
nano terraform.tfvars
nano secrets.tfvars
```

### 4. Initialize Terraform

```bash
cd ../..  # Back to terraform/ directory
terraform init
```

### 5. Plan Deployment

```bash
terraform plan \
  -var-file="environments/prod/terraform.tfvars" \
  -var-file="environments/prod/secrets.tfvars"
```

### 6. Apply Configuration

```bash
terraform apply \
  -var-file="environments/prod/terraform.tfvars" \
  -var-file="environments/prod/secrets.tfvars"
```

## Configuration

### Required Variables

Set these in `secrets.tfvars` (NEVER commit this file):

- `db_password` - PostgreSQL admin password
- `secret_key` - Flask secret key
- `jwt_secret_key` - JWT secret key
- `mail_username` - SMTP username
- `mail_password` - SMTP password (App Password for Gmail)

### Optional Variables

Customize in `terraform.tfvars`:

- `app_service_sku` - App Service tier (B1, B2, S1, S2, P1V2, etc.)
- `db_sku_name` - PostgreSQL tier
- `deploy_static_web_app` - Deploy frontend to Azure (false = use Vercel)
- `cors_allowed_origins` - Allowed frontend domains

## Deployment

### Backend Deployment

After Terraform creates infrastructure:

```bash
cd backend

# Create deployment package
zip -r backend.zip . -x "*.git*" "*.env*" "venv/*" "__pycache__/*"

# Deploy to Azure
az webapp deployment source config-zip \
  --resource-group rg-azure-solar-prod \
  --name app-azuresolar-api-prod \
  --src backend.zip

# Initialize database
az webapp ssh --name app-azuresolar-api-prod --resource-group rg-azure-solar-prod
python init_db.py
exit
```

### Frontend Deployment (Vercel)

```bash
cd frontend

# Install Vercel CLI if needed
npm i -g vercel

# Set environment variable
echo "NEXT_PUBLIC_API_URL=https://app-azuresolar-api-prod.azurewebsites.net" > .env.production

# Deploy
vercel deploy --prod
```

### Frontend Deployment (Azure Static Web App)

If `deploy_static_web_app = true`:

```bash
cd frontend

# Get deployment token from Terraform output
terraform output -raw frontend_deployment_token

# Install SWA CLI
npm i -g @azure/static-web-apps-cli

# Build and deploy
npm run build
swa deploy ./out --deployment-token <token-from-above>
```

## Environments

### Development

```bash
terraform workspace new dev
terraform plan -var-file="environments/dev/terraform.tfvars"
```

### Staging

```bash
terraform workspace new staging
terraform plan -var-file="environments/staging/terraform.tfvars"
```

### Production

```bash
terraform workspace select prod
terraform plan -var-file="environments/prod/terraform.tfvars"
```

## Resources Created

- **Resource Group**: rg-azure-solar-prod
- **App Service Plan**: asp-azuresolar-prod (Linux B1)
- **Web App**: app-azuresolar-api-prod (Python 3.11)
- **PostgreSQL Server**: psql-azuresolar-prod (Flexible Server)
- **PostgreSQL Database**: azure_solar
- **Storage Account**: stazuresolardocsprod
- **Storage Container**: project-documents
- **Static Web App** (optional): swa-azuresolar-prod

## Costs Estimation

### Minimum Configuration (Dev/Test)
- App Service B1: ~$13/month
- PostgreSQL B1ms: ~$25/month
- Storage (LRS): ~$0.02/GB/month
- **Total**: ~$40-50/month

### Production Configuration
- App Service P1V2: ~$100/month
- PostgreSQL GP_Gen5_2: ~$120/month
- Storage: ~$5/month
- **Total**: ~$225/month

## Monitoring

### View Logs

```bash
# Application logs
az webapp log tail --name app-azuresolar-api-prod --resource-group rg-azure-solar-prod

# Stream logs
az webapp log tail --name app-azuresolar-api-prod --resource-group rg-azure-solar-prod --slot production
```

### Health Check

```bash
curl https://app-azuresolar-api-prod.azurewebsites.net/health
```

## Troubleshooting

### Database Connection Issues

```bash
# Test database connectivity
az webapp ssh --name app-azuresolar-api-prod --resource-group rg-azure-solar-prod

# Inside SSH session
python -c "import psycopg2; print('OK')"
```

### App Not Starting

Check application logs:
```bash
az webapp log show --name app-azuresolar-api-prod --resource-group rg-azure-solar-prod
```

### CORS Errors

Update `cors_allowed_origins` in `terraform.tfvars` and re-apply:
```bash
terraform apply -var-file="environments/prod/terraform.tfvars" -var-file="environments/prod/secrets.tfvars"
```

## Cleanup

To destroy all resources:

```bash
terraform destroy \
  -var-file="environments/prod/terraform.tfvars" \
  -var-file="environments/prod/secrets.tfvars"
```

## Security Best Practices

1. **Never commit secrets.tfvars**
2. Use Azure Key Vault for production secrets
3. Enable Azure AD authentication
4. Set up network security groups
5. Enable Azure Defender
6. Regular security updates
7. Monitor audit logs

## Backup

### Database Backup

```bash
# Manual backup
az postgres flexible-server backup create \
  --resource-group rg-azure-solar-prod \
  --name psql-azuresolar-prod
```

### Automated Backups

Configured in Terraform:
- Retention: 7 days (configurable)
- Point-in-time restore available

## Support

For issues or questions:
- Email: support@azure-solar.pl
- Documentation: /docs folder
- GitHub Issues: Create an issue in the repository

---

**Last Updated**: January 2026  
**Version**: 1.0.0
