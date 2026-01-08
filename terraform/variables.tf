# Project variables
variable "project_name" {
  description = "Project name for resource naming"
  type        = string
  default     = "azuresolar"
}

variable "environment" {
  description = "Environment name (dev, staging, prod)"
  type        = string
  default     = "prod"
  
  validation {
    condition     = contains(["dev", "staging", "prod"], var.environment)
    error_message = "Environment must be dev, staging, or prod."
  }
}

variable "location" {
  description = "Azure region for resources"
  type        = string
  default     = "westeurope"
}

variable "resource_group_name" {
  description = "Resource group name"
  type        = string
  default     = "rg-azure-solar-prod"
}

variable "tags" {
  description = "Tags for all resources"
  type        = map(string)
  default = {
    Project     = "AzureSolar"
    Environment = "Production"
    ManagedBy   = "Terraform"
  }
}

# App Service variables
variable "app_service_sku" {
  description = "App Service Plan SKU"
  type        = string
  default     = "B1"  # Basic tier
}

variable "app_service_always_on" {
  description = "Keep app always on"
  type        = bool
  default     = true
}

variable "flask_env" {
  description = "Flask environment"
  type        = string
  default     = "production"
}

# Database variables
variable "db_name" {
  description = "PostgreSQL database name"
  type        = string
  default     = "azure_solar"
}

variable "db_admin_username" {
  description = "PostgreSQL admin username"
  type        = string
  default     = "solaradmin"
}

variable "db_password" {
  description = "PostgreSQL admin password"
  type        = string
  sensitive   = true
}

variable "db_storage_mb" {
  description = "PostgreSQL storage size in MB"
  type        = number
  default     = 32768  # 32 GB
}

variable "db_sku_name" {
  description = "PostgreSQL SKU"
  type        = string
  default     = "B_Standard_B1ms"  # Basic tier
}

# Security variables
variable "secret_key" {
  description = "Flask secret key"
  type        = string
  sensitive   = true
}

variable "jwt_secret_key" {
  description = "JWT secret key"
  type        = string
  sensitive   = true
}

# Email variables
variable "mail_server" {
  description = "SMTP server"
  type        = string
  default     = "smtp.gmail.com"
}

variable "mail_port" {
  description = "SMTP port"
  type        = number
  default     = 587
}

variable "mail_use_tls" {
  description = "Use TLS for email"
  type        = string
  default     = "True"
}

variable "mail_username" {
  description = "SMTP username"
  type        = string
}

variable "mail_password" {
  description = "SMTP password"
  type        = string
  sensitive   = true
}

variable "mail_sender" {
  description = "Default email sender"
  type        = string
  default     = "solar@azure-solar.pl"
}

# Frontend variables
variable "frontend_url" {
  description = "Frontend URL for CORS"
  type        = string
  default     = "https://azure-solar.vercel.app"
}

variable "cors_allowed_origins" {
  description = "Allowed CORS origins"
  type        = list(string)
  default     = [
    "https://azure-solar.vercel.app",
    "http://localhost:3000"
  ]
}

# Static Web App variables (optional)
variable "deploy_static_web_app" {
  description = "Deploy Azure Static Web App for frontend"
  type        = bool
  default     = false  # Use Vercel by default
}

variable "static_web_app_location" {
  description = "Static Web App location"
  type        = string
  default     = "westeurope"
}

variable "static_web_app_sku" {
  description = "Static Web App SKU"
  type        = string
  default     = "Free"
}
