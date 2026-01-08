@echo off
REM Azure Solar - Automatyczna Instalacja dla Windows
setlocal enabledelayedexpansion

color 0B
echo.
echo    ___                        _____       __         
echo   / _ ^| _____ __ _________   / ___/____  / /__ ____  
echo  / __ ^|/_/ -_) // / __/ -_)  \__ \/ __ \/ / _ `/ _ \ 
echo /_/ ^|_/___/\___/_/  \__/    /___/\____/_/\_,_/_//_/ 
echo.
echo     Automatyczna instalacja i konfiguracja
echo.

REM Sprawdzenie Node.js
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    color 0C
    echo [X] Node.js nie jest zainstalowany!
    echo     Pobierz z: https://nodejs.org/
    pause
    exit /b 1
)
echo [OK] Node.js zainstalowany

REM Sprawdzenie Python
where python >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    color 0C
    echo [X] Python nie jest zainstalowany!
    echo     Pobierz z: https://www.python.org/downloads/
    pause
    exit /b 1
)
echo [OK] Python zainstalowany

REM Sprawdzenie PostgreSQL
where psql >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    color 0E
    echo [!] PostgreSQL nie jest zainstalowany!
    echo     Pobierz z: https://www.postgresql.org/download/windows/
    echo     Lub zainstaluj przez winget: winget install PostgreSQL.PostgreSQL
    pause
    exit /b 1
)
echo [OK] PostgreSQL zainstalowany
echo.

REM Konfiguracja bazy danych
echo ============================================
echo  Konfiguracja bazy danych
echo ============================================
echo.

set /p DB_PASSWORD="Podaj haslo dla uzytkownika azure_user: "

psql -U postgres -c "DROP DATABASE IF EXISTS azure_solar;"
psql -U postgres -c "DROP USER IF EXISTS azure_user;"
psql -U postgres -c "CREATE DATABASE azure_solar;"
psql -U postgres -c "CREATE USER azure_user WITH PASSWORD '%DB_PASSWORD%';"
psql -U postgres -c "GRANT ALL PRIVILEGES ON DATABASE azure_solar TO azure_user;"
psql -U postgres -d azure_solar -c "GRANT ALL ON SCHEMA public TO azure_user;"

if %ERRORLEVEL% EQU 0 (
    echo [OK] Baza danych utworzona
) else (
    color 0C
    echo [X] Blad tworzenia bazy danych
    pause
    exit /b 1
)
echo.

REM Konfiguracja backendu
echo ============================================
echo  Konfiguracja backendu (Python/Flask)
echo ============================================
echo.

cd backend

REM Utworzenie venv
echo Tworzenie virtual environment...
python -m venv venv
call venv\Scripts\activate.bat

REM Instalacja zależności
echo Instalacja zaleznosci Python...
python -m pip install --upgrade pip >nul 2>&1
pip install -r requirements.txt >nul 2>&1

REM Konfiguracja .env
if not exist .env (
    echo Tworzenie pliku .env...
    copy .env.example .env >nul
    
    REM Generuj losowe klucze (prostsza wersja dla Windows)
    set SECRET_KEY=!RANDOM!!RANDOM!!RANDOM!!RANDOM!!RANDOM!
    set JWT_SECRET_KEY=!RANDOM!!RANDOM!!RANDOM!!RANDOM!!RANDOM!
    
    REM Aktualizuj .env (używając PowerShell)
    powershell -Command "(gc .env) -replace 'your-super-secret-key-change-this-in-production', '%SECRET_KEY%' | Out-File -encoding ASCII .env"
    powershell -Command "(gc .env) -replace 'your-jwt-secret-key', '%JWT_SECRET_KEY%' | Out-File -encoding ASCII .env"
    powershell -Command "(gc .env) -replace 'your_password', '%DB_PASSWORD%' | Out-File -encoding ASCII .env"
    
    echo [OK] Plik .env skonfigurowany
)

REM Konfiguracja email
echo.
set /p SETUP_EMAIL="Czy chcesz skonfigurowac email (Gmail SMTP)? (t/n): "
if /i "%SETUP_EMAIL%"=="t" (
    set /p GMAIL_ADDRESS="Gmail address: "
    set /p GMAIL_PASSWORD="Gmail app password: "
    
    powershell -Command "(gc .env) -replace 'your-email@gmail.com', '%GMAIL_ADDRESS%' | Out-File -encoding ASCII .env"
    powershell -Command "(gc .env) -replace 'your-app-specific-password', '%GMAIL_PASSWORD%' | Out-File -encoding ASCII .env"
)

REM Inicjalizacja bazy
echo.
echo Inicjalizacja bazy danych...
python init_db.py

echo [OK] Backend skonfigurowany
call venv\Scripts\deactivate.bat
cd ..
echo.

REM Konfiguracja frontendu
echo ============================================
echo  Konfiguracja frontendu (Next.js)
echo ============================================
echo.

cd frontend

echo Instalacja zaleznosci Node.js...
call npm install --silent

if not exist .env.local (
    echo Tworzenie pliku .env.local...
    copy .env.example .env.local >nul
    echo [OK] Plik .env.local utworzony
)

echo [OK] Frontend skonfigurowany
cd ..
echo.

REM Utworzenie skryptów uruchamiających
echo Tworzenie skryptow uruchamiajacych...

REM start.bat
(
echo @echo off
echo color 0B
echo echo.
echo echo ============================================
echo echo   Azure Solar - Uruchamianie
echo echo ============================================
echo echo.
echo.
echo echo [*] Backend ^(Flask^)...
echo cd backend
echo start /B cmd /c "venv\Scripts\activate.bat && python run.py > ..\backend.log 2>&1"
echo cd ..
echo timeout /t 3 /nobreak ^>nul
echo.
echo echo [OK] Backend: http://localhost:5000
echo echo.
echo echo [*] Frontend ^(Next.js^)...
echo cd frontend
echo start /B cmd /c "npm run dev > ..\frontend.log 2>&1"
echo cd ..
echo timeout /t 5 /nobreak ^>nul
echo.
echo echo [OK] Frontend: http://localhost:3000
echo echo.
echo echo ============================================
echo echo   Azure Solar dziala!
echo echo ============================================
echo echo.
echo echo Frontend:  http://localhost:3000
echo echo Backend:   http://localhost:5000
echo echo.
echo echo Panel klienta: http://localhost:3000/client/login
echo echo   Email: jan.kowalski@example.com
echo echo   Haslo: client123
echo echo.
echo echo Panel admina:  http://localhost:3000/admin/login
echo echo   Email: admin@azure-solar.pl
echo echo   Haslo: admin123
echo echo.
echo echo ============================================
echo echo.
echo echo Aby zatrzymac: stop.bat
echo echo.
echo pause
) > start.bat

REM stop.bat
(
echo @echo off
echo color 0C
echo echo.
echo echo Zatrzymywanie Azure Solar...
echo echo.
echo.
echo taskkill /F /IM python.exe /FI "WINDOWTITLE eq *run.py*" ^>nul 2^>^&1
echo taskkill /F /IM node.exe /FI "WINDOWTITLE eq *next*" ^>nul 2^>^&1
echo.
echo echo [OK] Azure Solar zatrzymany
echo echo.
echo pause
) > stop.bat

echo [OK] Skrypty utworzone: start.bat, stop.bat
echo.

REM Zakończenie
color 0A
echo ============================================
echo   Instalacja zakonczona pomyslnie!
echo ============================================
echo.
echo Aby uruchomic aplikacje:
echo   start.bat
echo.
echo Aby zatrzymac aplikacje:
echo   stop.bat
echo.
echo Wiecej informacji:
echo   README.md
echo   INSTALLATION.md
echo.

set /p RUN_NOW="Uruchomic teraz? (t/n): "
if /i "%RUN_NOW%"=="t" (
    call start.bat
)

endlocal
