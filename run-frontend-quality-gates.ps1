# Frontend Quality Gates Script
# Run this after Node.js is installed

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Fiji Cab Connect - Frontend Quality Gates" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check Node.js and npm
Write-Host "Checking Node.js and npm installation..." -ForegroundColor Yellow
node --version
npm --version
Write-Host ""

# Mobile Frontend Quality Gates
Write-Host "========================================" -ForegroundColor Green
Write-Host "Mobile Frontend (React Native/Expo)" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

Set-Location "09-FRONTEND-MOBILE"
Write-Host "Installing dependencies..." -ForegroundColor Yellow
npm install

Write-Host ""
Write-Host "Running linter..." -ForegroundColor Yellow
npm run lint

Write-Host ""
Write-Host "Running type check..." -ForegroundColor Yellow
npm run type-check

Write-Host ""
Write-Host "Running tests..." -ForegroundColor Yellow
npm test

Write-Host ""
Write-Host "Mobile frontend quality gates complete!" -ForegroundColor Green
Write-Host ""

# Return to root
Set-Location ..

# Admin Dashboard Quality Gates
Write-Host "========================================" -ForegroundColor Blue
Write-Host "Admin Dashboard (Next.js)" -ForegroundColor Blue
Write-Host "========================================" -ForegroundColor Blue
Write-Host ""

Set-Location "10-ADMIN-DASHBOARD"
Write-Host "Installing dependencies..." -ForegroundColor Yellow
npm install

Write-Host ""
Write-Host "Running linter..." -ForegroundColor Yellow
npm run lint

Write-Host ""
Write-Host "Running type check..." -ForegroundColor Yellow
npm run type-check

Write-Host ""
Write-Host "Running tests..." -ForegroundColor Yellow
npm test

Write-Host ""
Write-Host "Admin dashboard quality gates complete!" -ForegroundColor Green
Write-Host ""

# Return to root
Set-Location ..

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "All Frontend Quality Gates Complete!" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
