# Driver App Quick Start Script
# Run this to get the app ready for demo

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  CAB CONNECT DRIVER APP QUICK START  " -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Navigate to Driver App
Write-Host "[1/6] Navigating to Driver App folder..." -ForegroundColor Yellow
Set-Location -Path "D:\Salman\Projects\fijicabconnect.com\cab-connect-platform-main\10-DRIVER-APP"

# Step 2: Install dependencies
Write-Host "[2/6] Installing dependencies (this may take 2-3 minutes)..." -ForegroundColor Yellow
npm install

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ npm install failed! Check errors above." -ForegroundColor Red
    exit 1
}

Write-Host "✅ Dependencies installed successfully!" -ForegroundColor Green
Write-Host ""

# Step 3: Copy logo assets
Write-Host "[3/6] Copying logo assets from Passenger App..." -ForegroundColor Yellow
$sourceFolder = "..\09-FRONTEND-MOBILE\src\assets\logo"
$destFolder = "src\assets\logo"

if (Test-Path $sourceFolder) {
    New-Item -ItemType Directory -Force -Path $destFolder | Out-Null
    Copy-Item "$sourceFolder\*" -Destination $destFolder -Force -ErrorAction SilentlyContinue
    Write-Host "✅ Logo assets copied!" -ForegroundColor Green
} else {
    Write-Host "⚠️  Logo assets not found. App will use emoji placeholders." -ForegroundColor Yellow
}
Write-Host ""

# Step 4: Create .env.development file
Write-Host "[4/6] Creating environment configuration..." -ForegroundColor Yellow
$envContent = @"
# Backend API Configuration
EXPO_PUBLIC_API_URL=https://cab-connect-api.onrender.com/api/v1

# App Configuration
EXPO_PUBLIC_APP_ENV=development
EXPO_PUBLIC_APP_VERSION=1.0.0

# Google Maps API Key (add your key here)
EXPO_PUBLIC_MAPS_API_KEY=your_google_maps_key_here
"@

$envContent | Out-File -FilePath ".env.development" -Encoding UTF8 -Force
Write-Host "✅ Environment file created!" -ForegroundColor Green
Write-Host ""

# Step 5: Verify package.json
Write-Host "[5/6] Verifying package.json..." -ForegroundColor Yellow
if (Test-Path "package.json") {
    Write-Host "✅ package.json exists!" -ForegroundColor Green
} else {
    Write-Host "❌ package.json not found!" -ForegroundColor Red
    exit 1
}
Write-Host ""

# Step 6: Display next steps
Write-Host "[6/6] Setup Complete! 🎉" -ForegroundColor Green
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "         NEXT STEPS                     " -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "To start the app:" -ForegroundColor White
Write-Host "  npm start" -ForegroundColor Yellow
Write-Host ""
Write-Host "Then:" -ForegroundColor White
Write-Host "  1. Install 'Expo Go' app on your Android phone" -ForegroundColor White
Write-Host "  2. Scan the QR code that appears" -ForegroundColor White
Write-Host "  3. Wait 30-60 seconds for app to load" -ForegroundColor White
Write-Host ""
Write-Host "To build APK for client:" -ForegroundColor White
Write-Host "  eas login" -ForegroundColor Yellow
Write-Host "  eas build --platform android --profile preview" -ForegroundColor Yellow
Write-Host ""
Write-Host "For detailed instructions, see:" -ForegroundColor White
Write-Host "  DRIVER-APP-DEPLOYMENT-CHECKLIST.md" -ForegroundColor Cyan
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Optional: Ask if user wants to start the server now
$startNow = Read-Host "Start development server now? (y/n)"
if ($startNow -eq 'y' -or $startNow -eq 'Y') {
    Write-Host ""
    Write-Host "Starting Expo development server..." -ForegroundColor Yellow
    Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Gray
    Write-Host ""
    npm start
}
