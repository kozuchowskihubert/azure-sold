# Azure Solar - Makefile
# Łatwe zarządzanie projektem

.PHONY: help setup install start stop restart clean logs test dev prod deploy

# Domyślny target
.DEFAULT_GOAL := help

# Kolory dla outputu
BLUE := \033[0;34m
GREEN := \033[0;32m
YELLOW := \033[1;33m
RED := \033[0;31m
NC := \033[0m # No Color

help: ## Wyświetl pomoc
	@echo "$(BLUE)╔════════════════════════════════════════╗$(NC)"
	@echo "$(BLUE)║     Azure Solar - Dostępne komendy    ║$(NC)"
	@echo "$(BLUE)╚════════════════════════════════════════╝$(NC)"
	@echo ""
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  $(GREEN)%-15s$(NC) %s\n", $$1, $$2}'
	@echo ""

setup: ## Automatyczna instalacja (uruchom raz)
	@echo "$(YELLOW)🚀 Uruchamianie automatycznej instalacji...$(NC)"
	@chmod +x setup.sh
	@./setup.sh

install: ## Instalacja zależności (bez bazy)
	@echo "$(YELLOW)📦 Instalacja zależności...$(NC)"
	@cd backend && python3 -m venv venv && . venv/bin/activate && pip install -r requirements.txt
	@cd frontend && npm install
	@echo "$(GREEN)✅ Zależności zainstalowane$(NC)"

start: ## Uruchom aplikację (backend + frontend)
	@echo "$(GREEN)🚀 Uruchamianie Azure Solar...$(NC)"
	@chmod +x start.sh
	@./start.sh

stop: ## Zatrzymaj aplikację
	@echo "$(RED)⏹️  Zatrzymywanie Azure Solar...$(NC)"
	@chmod +x stop.sh
	@./stop.sh

restart: stop start ## Restart aplikacji

dev: ## Uruchom w trybie development (z logami)
	@echo "$(BLUE)🔧 Development mode...$(NC)"
	@trap 'kill 0' INT; \
	cd backend && . venv/bin/activate && python run.py & \
	cd frontend && npm run dev

backend: ## Uruchom tylko backend
	@echo "$(GREEN)🐍 Uruchamianie backendu...$(NC)"
	@cd backend && . venv/bin/activate && python run.py

frontend: ## Uruchom tylko frontend
	@echo "$(GREEN)🌐 Uruchamianie frontendu...$(NC)"
	@cd frontend && npm run dev

db-init: ## Inicjalizacja bazy danych
	@echo "$(YELLOW)🗄️  Inicjalizacja bazy danych...$(NC)"
	@cd backend && . venv/bin/activate && python init_db.py
	@echo "$(GREEN)✅ Baza danych zainicjalizowana$(NC)"

db-reset: ## Reset bazy danych (USUWA WSZYSTKIE DANE!)
	@echo "$(RED)⚠️  UWAGA: Wszystkie dane zostaną usunięte!$(NC)"
	@read -p "Kontynuować? (tak/nie): " confirm; \
	if [ "$$confirm" = "tak" ]; then \
		psql -U postgres -c "DROP DATABASE IF EXISTS azure_solar;" && \
		psql -U postgres -c "CREATE DATABASE azure_solar;" && \
		psql -U postgres -c "GRANT ALL PRIVILEGES ON DATABASE azure_solar TO azure_user;" && \
		cd backend && . venv/bin/activate && python init_db.py && \
		echo "$(GREEN)✅ Baza danych zresetowana$(NC)"; \
	else \
		echo "$(YELLOW)Anulowano$(NC)"; \
	fi

logs: ## Wyświetl logi (backend + frontend)
	@echo "$(BLUE)📊 Logi aplikacji (Ctrl+C aby wyjść)$(NC)"
	@tail -f backend.log frontend.log

logs-backend: ## Wyświetl logi backendu
	@tail -f backend.log

logs-frontend: ## Wyświetl logi frontendu
	@tail -f frontend.log

clean: ## Wyczyść pliki tymczasowe i cache
	@echo "$(YELLOW)🧹 Czyszczenie...$(NC)"
	@rm -rf backend/__pycache__ backend/**/__pycache__
	@rm -rf backend/.pytest_cache
	@rm -rf frontend/.next
	@rm -rf frontend/node_modules/.cache
	@rm -f backend.log frontend.log
	@rm -f .backend.pid .frontend.pid
	@echo "$(GREEN)✅ Wyczyszczono$(NC)"

clean-all: clean ## Usuń wszystko (venv, node_modules)
	@echo "$(RED)⚠️  Usuwanie wszystkich zależności...$(NC)"
	@rm -rf backend/venv
	@rm -rf frontend/node_modules
	@rm -rf frontend/.next
	@echo "$(GREEN)✅ Wszystko usunięte$(NC)"

test: ## Uruchom testy (backend + frontend)
	@echo "$(BLUE)🧪 Uruchamianie testów...$(NC)"
	@cd backend && . venv/bin/activate && pytest || echo "$(YELLOW)Brak testów backendu$(NC)"
	@cd frontend && npm run test || echo "$(YELLOW)Brak testów frontendu$(NC)"

test-backend: ## Uruchom testy backendu
	@cd backend && . venv/bin/activate && pytest

test-frontend: ## Uruchom testy frontendu
	@cd frontend && npm run test

lint: ## Sprawdź kod (linting)
	@echo "$(BLUE)🔍 Linting...$(NC)"
	@cd backend && . venv/bin/activate && flake8 app/ || echo "$(YELLOW)Zainstaluj flake8: pip install flake8$(NC)"
	@cd frontend && npm run lint

format: ## Formatuj kod (black + prettier)
	@echo "$(BLUE)✨ Formatowanie kodu...$(NC)"
	@cd backend && . venv/bin/activate && black app/ || echo "$(YELLOW)Zainstaluj black: pip install black$(NC)"
	@cd frontend && npx prettier --write . || echo "$(YELLOW)Zainstaluj prettier: npm install -D prettier$(NC)"

type-check: ## Sprawdź typy TypeScript
	@cd frontend && npm run type-check

build: ## Build produkcyjny (frontend)
	@echo "$(BLUE)🏗️  Building production...$(NC)"
	@cd frontend && npm run build
	@echo "$(GREEN)✅ Build zakończony$(NC)"

prod: build ## Uruchom w trybie produkcyjnym
	@echo "$(GREEN)🚀 Production mode...$(NC)"
	@trap 'kill 0' INT; \
	cd backend && . venv/bin/activate && gunicorn -w 4 -b 0.0.0.0:5000 run:app & \
	cd frontend && npm start

deploy-vercel: ## Deploy frontendu na Vercel
	@echo "$(BLUE)☁️  Deploying do Vercel...$(NC)"
	@cd frontend && vercel --prod

deploy-azure: ## Deploy backendu na Azure
	@echo "$(BLUE)☁️  Deploying do Azure...$(NC)"
	@cd terraform/environments/prod && terraform apply

status: ## Sprawdź status aplikacji
	@echo "$(BLUE)📊 Status aplikacji$(NC)"
	@echo ""
	@if curl -s http://localhost:5000/api/health > /dev/null 2>&1; then \
		echo "$(GREEN)✅ Backend:  http://localhost:5000 (działa)$(NC)"; \
	else \
		echo "$(RED)❌ Backend:  http://localhost:5000 (nie działa)$(NC)"; \
	fi
	@if curl -s http://localhost:3000 > /dev/null 2>&1; then \
		echo "$(GREEN)✅ Frontend: http://localhost:3000 (działa)$(NC)"; \
	else \
		echo "$(RED)❌ Frontend: http://localhost:3000 (nie działa)$(NC)"; \
	fi
	@echo ""

health: ## Health check API
	@curl -s http://localhost:5000/api/health | python3 -m json.tool || echo "$(RED)Backend nie odpowiada$(NC)"

urls: ## Wyświetl wszystkie URL-e
	@echo "$(BLUE)╔════════════════════════════════════════╗$(NC)"
	@echo "$(BLUE)║          Azure Solar - URLs            ║$(NC)"
	@echo "$(BLUE)╚════════════════════════════════════════╝$(NC)"
	@echo ""
	@echo "$(GREEN)🌐 Frontend:$(NC)      http://localhost:3000"
	@echo "$(GREEN)🔌 Backend API:$(NC)   http://localhost:5000"
	@echo "$(GREEN)📊 Health Check:$(NC)  http://localhost:5000/api/health"
	@echo ""
	@echo "$(YELLOW)👤 Panel Klienta:$(NC)  http://localhost:3000/client/login"
	@echo "   Email: jan.kowalski@example.com"
	@echo "   Hasło: client123"
	@echo ""
	@echo "$(YELLOW)⚙️  Panel Admina:$(NC)   http://localhost:3000/admin/login"
	@echo "   Email: admin@azure-solar.pl"
	@echo "   Hasło: admin123"
	@echo ""

info: ## Informacje o projekcie
	@echo "$(BLUE)╔════════════════════════════════════════╗$(NC)"
	@echo "$(BLUE)║        Azure Solar - Project Info      ║$(NC)"
	@echo "$(BLUE)╚════════════════════════════════════════╝$(NC)"
	@echo ""
	@echo "$(GREEN)Backend:$(NC)"
	@cd backend && . venv/bin/activate && python --version
	@cd backend && . venv/bin/activate && pip list | grep Flask
	@echo ""
	@echo "$(GREEN)Frontend:$(NC)"
	@cd frontend && node --version
	@cd frontend && npm --version
	@cd frontend && npm list react next 2>/dev/null | grep -E "react|next" || echo "Zainstaluj zależności: make install"
	@echo ""
	@echo "$(GREEN)Database:$(NC)"
	@psql --version || echo "PostgreSQL nie zainstalowany"
	@echo ""

# Aliasy
i: install
s: start
r: restart
l: logs
c: clean
t: test
h: help

# Dokumentacja
docs: ## Otwórz dokumentację w przeglądarce
	@open README.md || xdg-open README.md || start README.md

quick: ## Szybki start (instalacja + uruchomienie)
	@make setup
	@make start

# Development helpers
shell-backend: ## Otwórz Python shell z załadowaną aplikacją
	@cd backend && . venv/bin/activate && python -c "from app import create_app, db; app = create_app(); app.app_context().push(); print('App context ready. Use: db, User, Project, etc.')" -i

shell-frontend: ## Otwórz Node REPL
	@cd frontend && node

watch-logs: logs ## Alias dla logs

ps: ## Pokaż procesy aplikacji
	@echo "$(BLUE)🔍 Procesy Azure Solar:$(NC)"
	@ps aux | grep -E "(python run.py|npm.*dev|next)" | grep -v grep || echo "$(YELLOW)Brak uruchomionych procesów$(NC)"

ports: ## Sprawdź zajęte porty
	@echo "$(BLUE)🔌 Porty:$(NC)"
	@lsof -i :5000 -i :3000 || echo "$(GREEN)Porty 5000 i 3000 są wolne$(NC)"
