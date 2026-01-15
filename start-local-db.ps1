# Starts local PostgreSQL using Docker Compose
param()
$ErrorActionPreference = "Stop"

function Require-Docker {
  if (-not (Get-Command docker -ErrorAction SilentlyContinue)) {
    Write-Error "Docker CLI not found. Install Docker Desktop and try again."; exit 1
  }
}

Require-Docker
$compose = Join-Path $PSScriptRoot "docker-compose.local.yml"
if (-not (Test-Path $compose)) { Write-Error "Compose file not found: $compose"; exit 1 }

Write-Host "Starting local Postgres via Docker Compose..."
& docker compose -f $compose up -d

Write-Host "Postgres container started: local-postgres"
Write-Host "Connect using: postgresql+psycopg2://appuser:appsecret@localhost:5432/appdb"