# Stops local PostgreSQL Docker Compose stack
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

Write-Host "Stopping local Postgres..."
& docker compose -f $compose down
Write-Host "Stopped. Volume 'postgres_data' persists between runs."