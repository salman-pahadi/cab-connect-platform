# System Architecture

## Components
- Android Apps → Backend APIs
- Backend → PostgreSQL (RDS)
- Backend → S3 (documents)
- Backend → SMS Gateway

## Architecture
- Monolith backend
- Stateless APIs
- Polling-based updates

## Scaling
Vertical first, horizontal later.
