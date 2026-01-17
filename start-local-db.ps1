# Starts complete Cab Connect development environment
# 1. PostgreSQL Docker container
# 2. Backend FastAPI server (optional with -Backend flag)
# 3. Passenger mobile app (optional with -Passenger flag)
# 4. Driver mobile app (optional with -Driver flag)
param(
  [switch]$Backend,
  [switch]$Passenger,
  [switch]$Driver,
  [switch]$All
)
$ErrorActionPreference = "Stop"

function Require-Docker {
  if (-not (Get-Command docker -ErrorAction SilentlyContinue)) {
    Write-Error "Docker CLI not found. Install Docker Desktop and try again."; exit 1
  }
}

# === STEP 1: Start PostgreSQL ===
Write-Host "`n[DATABASE] Starting PostgreSQL..." -ForegroundColor Cyan
Require-Docker
$compose = Join-Path $PSScriptRoot "docker-compose.local.yml"
if (-not (Test-Path $compose)) { Write-Error "Compose file not found: $compose"; exit 1 }

& docker compose -f $compose up -d
Write-Host "[SUCCESS] PostgreSQL running: postgresql+psycopg2://appuser:appsecret@localhost:5432/appdb" -ForegroundColor Green

# === STEP 2: Start Backend (Optional) ===
if ($Backend -or $All) {
  Write-Host "`n[BACKEND] Starting Backend Server..." -ForegroundColor Cyan
  $backendPath = Join-Path $PSScriptRoot "08-BACKEND"
  $venvPython = Join-Path $PSScriptRoot ".venv\Scripts\python.exe"
  
  if (-not (Test-Path $venvPython)) {
    Write-Warning "Virtual environment not found at: $venvPython"
    Write-Host "Run: python -m venv .venv; .\.venv\Scripts\activate; pip install -r 08-BACKEND\requirements.txt"
  } else {
    Write-Host "Starting uvicorn on http://127.0.0.1:8000 (Press Ctrl+C in backend terminal to stop)"
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$backendPath'; & '$venvPython' -m uvicorn app.main:app --reload"
    Write-Host "[SUCCESS] Backend server starting in new terminal" -ForegroundColor Green
  }
}

# === STEP 3: Start Passenger App (Optional) ===
if ($Passenger -or $All) {
  Write-Host "`n[PASSENGER] Starting Passenger Mobile App..." -ForegroundColor Cyan
  $passengerPath = Join-Path $PSScriptRoot "10-PASSENGER-APP"
  
  if (-not (Test-Path (Join-Path $passengerPath "node_modules"))) {
    Write-Warning "Node modules not found. Run: cd 10-PASSENGER-APP; npm install"
  } else {
    Write-Host "Starting Expo Dev Server (Press Ctrl+C in passenger terminal to stop)"
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$passengerPath'; npm start"
    Write-Host "[SUCCESS] Passenger app starting in new terminal" -ForegroundColor Green
  }
}

# === STEP 4: Start Driver App (Optional) ===
if ($Driver -or $All) {
  Write-Host "`n[DRIVER] Starting Driver Mobile App..." -ForegroundColor Cyan
  $driverPath = Join-Path $PSScriptRoot "11-DRIVER-APP"
  
  if (-not (Test-Path (Join-Path $driverPath "node_modules"))) {
    Write-Warning "Node modules not found. Run: cd 11-DRIVER-APP; npm install"
  } else {
    Write-Host "Starting Expo Dev Server (Press Ctrl+C in driver terminal to stop)"
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$driverPath'; npm start"
    Write-Host "[SUCCESS] Driver app starting in new terminal" -ForegroundColor Green
  }
}

# === Summary ===
Write-Host "`n=== Development Environment Ready ===" -ForegroundColor Green
Write-Host "Database:   http://localhost:5432" -ForegroundColor White
if ($Backend -or $All) {
  Write-Host "Backend:    http://localhost:8000/docs" -ForegroundColor White
}
if ($Passenger -or $All) {
  Write-Host "Passenger:  Check Expo terminal for QR code" -ForegroundColor White
}
if ($Driver -or $All) {
  Write-Host "Driver:     Check Expo terminal for QR code" -ForegroundColor White
}

if (-not ($Backend -or $Passenger -or $Driver -or $All)) {
  Write-Host "`nTip: Use flags to start more services:" -ForegroundColor Yellow
  Write-Host "   .\start-local-db.ps1 -Backend      # Start DB + Backend"
  Write-Host "   .\start-local-db.ps1 -Passenger    # Start DB + Passenger App"
  Write-Host "   .\start-local-db.ps1 -Driver       # Start DB + Driver App"
  Write-Host "   .\start-local-db.ps1 -All          # Start everything`n"
}
