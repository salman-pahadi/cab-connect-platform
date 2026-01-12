# Cab Connect Backend

FastAPI backend for the Cab Connect ride-hailing platform.

## 🚀 Quick Start

### Prerequisites
- Python 3.14+ (or 3.13 for stability)
- PostgreSQL 15+
- Redis 7+
- Docker & Docker Compose (optional)

### Setup

1. **Clone and navigate to backend:**
```bash
cd 08-BACKEND
```

2. **Create virtual environment:**
```bash
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
```

3. **Install dependencies:**
```bash
pip install -r requirements-dev.txt
```

4. **Configure environment:**
```bash
cp .env.example .env
# Edit .env with your configuration
```

5. **Start database (Docker):**
```bash
docker-compose up -d postgres redis
```

6. **Initialize database:**
```bash
python scripts/init_db.py
```

7. **Run application:**
```bash
uvicorn app.main:app --reload
```

The API will be available at: `http://localhost:8000`

## 🐳 Docker Setup

### Run everything with Docker Compose:
```bash
docker-compose up -d
```

### Run only databases:
```bash
docker-compose up -d postgres redis
```

### Stop services:
```bash
docker-compose down
```

## 🧪 Testing

### Run all tests:
```bash
pytest
```

### Run with coverage:
```bash
pytest --cov=app --cov-report=html
```

### Run specific test file:
```bash
pytest tests/test_health.py -v
```

## 🎨 Code Quality

### Format code:
```bash
black app tests
```

### Lint code:
```bash
ruff check app tests
```

### Type check:
```bash
mypy app
```

### Run all checks:
```bash
pre-commit run --all-files
```

## 📁 Project Structure

```
08-BACKEND/
├── app/
│   ├── api/          # API endpoints
│   ├── models/       # Database models
│   ├── schemas/      # Pydantic schemas
│   ├── services/     # Business logic
│   ├── utils/        # Utilities
│   ├── database/     # Database configuration
│   └── migrations/   # Alembic migrations
├── tests/            # Test files
├── scripts/          # Utility scripts
└── requirements.txt  # Dependencies
```

## 📝 API Documentation

- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## 🔧 Environment Variables

See `.env.example` for all available configuration options.

### Required:
- `DATABASE_URL` - PostgreSQL connection string
- `REDIS_URL` - Redis connection string
- `SECRET_KEY` - JWT secret key (min 32 characters)

### Optional:
- `ENVIRONMENT` - Environment name (development/production)
- `DEBUG` - Enable debug mode
- `LOG_LEVEL` - Logging level

## 📦 Database Migrations

### Create new migration:
```bash
alembic revision --autogenerate -m "description"
```

### Apply migrations:
```bash
alembic upgrade head
```

### Rollback migration:
```bash
alembic downgrade -1
```

## 🛠️ Development

### Install pre-commit hooks:
```bash
pre-commit install
```

### Update dependencies:
```bash
pip install --upgrade -r requirements.txt
```

### Check for security vulnerabilities:
```bash
pip install safety
safety check
```

## 📊 Monitoring

### Health Check:
```bash
curl http://localhost:8000/health
```

### API Version:
```bash
curl http://localhost:8000/api/v1/health
```

## 🚨 Troubleshooting

### Database connection issues:
1. Ensure PostgreSQL is running
2. Check DATABASE_URL in .env
3. Verify database exists

### Import errors:
1. Activate virtual environment
2. Reinstall dependencies: `pip install -r requirements.txt`

### Port already in use:
```bash
# Windows
netstat -ano | findstr :8000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:8000 | xargs kill -9
```

## 📄 License

Proprietary - Cab Connect Platform

## 🤝 Contributing

1. Follow coding standards (Black, Ruff)
2. Write tests for new features
3. Update documentation
4. Run pre-commit hooks

## 📞 Support

For issues or questions, contact the development team.
