#!/usr/bin/env python3
"""Initialize database script."""

import sys
from pathlib import Path

from app.config import settings
from app.database.session import engine
from app.models.base import Base
from app.utils.logger import logger

# Add parent directory to path
sys.path.insert(0, str(Path(__file__).parent.parent))


def init_db():
    """Initialize database tables."""
    try:
        logger.info("Initializing database...")
        logger.info(f"Database URL: {settings.DATABASE_URL}")

        # Create all tables
        Base.metadata.create_all(bind=engine)

        logger.info("✅ Database initialized successfully")
    except Exception as e:
        logger.error(f"❌ Failed to initialize database: {e}")
        sys.exit(1)


if __name__ == "__main__":
    init_db()
