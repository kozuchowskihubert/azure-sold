# API outputs
output "api_url" {
  description = "Backend API URL"
  value       = "https://${azurerm_linux_web_app.api.default_hostname}"
}

output "api_app_name" {
  description = "Backend App Service name"
  value       = azurerm_linux_web_app.api.name
}

# Database outputs
output "db_server_fqdn" {
  description = "PostgreSQL server FQDN"
  value       = azurerm_postgresql_flexible_server.main.fqdn
}

output "db_name" {
  description = "PostgreSQL database name"
  value       = azurerm_postgresql_flexible_server_database.main.name
}

output "db_connection_string" {
  description = "PostgreSQL connection string (sensitive)"
  value       = "postgresql://${azurerm_postgresql_flexible_server.main.administrator_login}:***@${azurerm_postgresql_flexible_server.main.fqdn}:5432/${azurerm_postgresql_flexible_server_database.main.name}?sslmode=require"
  sensitive   = false
}

# Frontend outputs (if deployed)
output "frontend_url" {
  description = "Frontend Static Web App URL"
  value       = var.deploy_static_web_app ? "https://${azurerm_static_site.frontend[0].default_host_name}" : "Deployed to Vercel"
}

output "frontend_deployment_token" {
  description = "Static Web App deployment token (sensitive)"
  value       = var.deploy_static_web_app ? azurerm_static_site.frontend[0].api_key : "N/A"
  sensitive   = true
}

# Storage outputs
output "storage_account_name" {
  description = "Storage account name for documents"
  value       = azurerm_storage_account.documents.name
}

output "storage_connection_string" {
  description = "Storage connection string (sensitive)"
  value       = azurerm_storage_account.documents.primary_connection_string
  sensitive   = true
}

# Resource Group output
output "resource_group_name" {
  description = "Resource group name"
  value       = azurerm_resource_group.main.name
}

# Deployment summary
output "deployment_summary" {
  description = "Deployment summary with important information"
  value = <<-EOT
  
  ☀️ ═════════════════════════════════════════════════════
     AZURE SOLAR - DEPLOYMENT COMPLETE
  ═════════════════════════════════════════════════════ ☀️
  
  📦 Resources Created:
  - Resource Group: ${azurerm_resource_group.main.name}
  - PostgreSQL Server: ${azurerm_postgresql_flexible_server.main.name}
  - Backend API: ${azurerm_linux_web_app.api.name}
  ${var.deploy_static_web_app ? "- Frontend: ${azurerm_static_site.frontend[0].name}" : "- Frontend: Deployed to Vercel"}
  - Storage Account: ${azurerm_storage_account.documents.name}
  
  🌐 URLs:
  - API: https://${azurerm_linux_web_app.api.default_hostname}
  - Frontend: ${var.deploy_static_web_app ? "https://${azurerm_static_site.frontend[0].default_host_name}" : var.frontend_url}
  
  🗄️  Database:
  - Server: ${azurerm_postgresql_flexible_server.main.fqdn}
  - Database: ${azurerm_postgresql_flexible_server_database.main.name}
  
  🚀 Next Steps:
  
  1. Initialize Database:
     az webapp ssh --name ${azurerm_linux_web_app.api.name} --resource-group ${azurerm_resource_group.main.name}
     python init_db.py
  
  2. Update Frontend Environment:
     NEXT_PUBLIC_API_URL=https://${azurerm_linux_web_app.api.default_hostname}
  
  3. Deploy Backend Code:
     cd backend
     zip -r backend.zip .
     az webapp deployment source config-zip --resource-group ${azurerm_resource_group.main.name} --name ${azurerm_linux_web_app.api.name} --src backend.zip
  
  ${var.deploy_static_web_app ? "4. Deploy Frontend:\n     cd frontend\n     npm run build\n     swa deploy ./out --deployment-token <token>" : "4. Deploy Frontend to Vercel:\n     cd frontend\n     vercel deploy --prod"}
  
  📝 Important:
  - Admin credentials will be created by init_db.py
  - Configure custom domain if needed
  - Set up SSL certificates (automatic with Azure)
  - Enable monitoring and alerts
  
  ═════════════════════════════════════════════════════════
  
  EOT
}
