# Azure Solar - Terraform Configuration
terraform {
  required_version = ">= 1.5.0"
  
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.80.0"
    }
  }
  
  backend "azurerm" {
    resource_group_name  = "rg-solar-terraform-state"
    storage_account_name = "solarterraformstate"
    container_name       = "tfstate"
    key                  = "prod.terraform.tfstate"
  }
}

provider "azurerm" {
  features {}
}

# Resource Group
resource "azurerm_resource_group" "main" {
  name     = var.resource_group_name
  location = var.location
  
  tags = var.tags
}

# App Service Plan (Linux)
resource "azurerm_service_plan" "main" {
  name                = "asp-${var.project_name}-${var.environment}"
  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_resource_group.main.location
  os_type             = "Linux"
  sku_name            = var.app_service_sku
  
  tags = var.tags
}

# Backend API (Flask)
resource "azurerm_linux_web_app" "api" {
  name                = "app-${var.project_name}-api-${var.environment}"
  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_resource_group.main.location
  service_plan_id     = azurerm_service_plan.main.id
  
  https_only = true
  
  site_config {
    always_on = var.app_service_always_on
    
    application_stack {
      python_version = "3.11"
    }
    
    cors {
      allowed_origins     = var.cors_allowed_origins
      support_credentials = true
    }
  }
  
  app_settings = {
    "FLASK_ENV"                        = var.flask_env
    "SCM_DO_BUILD_DURING_DEPLOYMENT"   = "true"
    "ENABLE_ORYX_BUILD"                = "true"
    "SECRET_KEY"                       = var.secret_key
    "JWT_SECRET_KEY"                   = var.jwt_secret_key
    "DATABASE_URL"                     = "postgresql://${azurerm_postgresql_flexible_server.main.administrator_login}:${var.db_password}@${azurerm_postgresql_flexible_server.main.fqdn}:5432/${azurerm_postgresql_flexible_server_database.main.name}?sslmode=require"
    "MAIL_SERVER"                      = var.mail_server
    "MAIL_PORT"                        = var.mail_port
    "MAIL_USE_TLS"                     = var.mail_use_tls
    "MAIL_USERNAME"                    = var.mail_username
    "MAIL_PASSWORD"                    = var.mail_password
    "MAIL_DEFAULT_SENDER"              = var.mail_sender
    "FRONTEND_URL"                     = var.frontend_url
  }
  
  tags = var.tags
}

# PostgreSQL Flexible Server
resource "azurerm_postgresql_flexible_server" "main" {
  name                   = "psql-${var.project_name}-${var.environment}"
  resource_group_name    = azurerm_resource_group.main.name
  location               = azurerm_resource_group.main.location
  version                = "14"
  administrator_login    = var.db_admin_username
  administrator_password = var.db_password
  storage_mb             = var.db_storage_mb
  sku_name               = var.db_sku_name
  
  backup_retention_days = 7
  
  tags = var.tags
}

# PostgreSQL Database
resource "azurerm_postgresql_flexible_server_database" "main" {
  name      = var.db_name
  server_id = azurerm_postgresql_flexible_server.main.id
  charset   = "UTF8"
  collation = "en_US.utf8"
}

# Allow Azure services to access PostgreSQL
resource "azurerm_postgresql_flexible_server_firewall_rule" "azure_services" {
  name             = "AllowAzureServices"
  server_id        = azurerm_postgresql_flexible_server.main.id
  start_ip_address = "0.0.0.0"
  end_ip_address   = "0.0.0.0"
}

# Static Web App (Frontend) - Optional, alternative to Vercel
resource "azurerm_static_site" "frontend" {
  count               = var.deploy_static_web_app ? 1 : 0
  name                = "swa-${var.project_name}-${var.environment}"
  resource_group_name = azurerm_resource_group.main.name
  location            = var.static_web_app_location
  sku_tier            = var.static_web_app_sku
  sku_size            = var.static_web_app_sku
  
  tags = var.tags
}

# Storage Account for documents
resource "azurerm_storage_account" "documents" {
  name                     = "st${var.project_name}docs${var.environment}"
  resource_group_name      = azurerm_resource_group.main.name
  location                 = azurerm_resource_group.main.location
  account_tier             = "Standard"
  account_replication_type = "LRS"
  
  blob_properties {
    cors_rule {
      allowed_headers    = ["*"]
      allowed_methods    = ["GET", "HEAD"]
      allowed_origins    = var.cors_allowed_origins
      exposed_headers    = ["*"]
      max_age_in_seconds = 3600
    }
  }
  
  tags = var.tags
}

# Storage Container for project documents
resource "azurerm_storage_container" "project_documents" {
  name                  = "project-documents"
  storage_account_name  = azurerm_storage_account.documents.name
  container_access_type = "private"
}
