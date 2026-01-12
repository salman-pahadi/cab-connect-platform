#!/bin/pwsh
# Admin Dashboard Installation and Quality Gates Script

Set-Location "D:\Salman\Projects\fijicabconnect.com\cab-connect-platform-main\10-ADMIN-DASHBOARD"

Write-Host "Admin Dashboard - Installing Dependencies..." -ForegroundColor Yellow
npm install --legacy-peer-deps --omit=optional 2>&1 | Out-Host

Write-Host ""
Write-Host "Running Linter..." -ForegroundColor Yellow  
npm run lint 2>&1 | Tee-Object -FilePath admin-lint-report.txt

Write-Host ""
Write-Host "Running Type Check..." -ForegroundColor Yellow
npm run type-check 2>&1 | Tee-Object -FilePath admin-typecheck-report.txt

Write-Host ""
Write-Host "Running Tests..." -ForegroundColor Yellow
npm test 2>&1 | Tee-Object -FilePath admin-test-report.txt

Write-Host ""
Write-Host "Admin Dashboard Quality Gates Complete!" -ForegroundColor Green
