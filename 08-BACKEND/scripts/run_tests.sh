#!/bin/bash
# Run all tests with coverage

set -e

echo "🧪 Running tests with coverage..."

# Activate virtual environment if it exists
if [ -d "venv" ]; then
    source venv/bin/activate
elif [ -d ".venv" ]; then
    source .venv/bin/activate
fi

# Run pytest with coverage
pytest tests/ \
    -v \
    --cov=app \
    --cov-report=term-missing \
    --cov-report=html \
    --cov-report=xml \
    --cov-fail-under=80

echo "✅ Tests completed!"
echo "📊 Coverage report: htmlcov/index.html"
