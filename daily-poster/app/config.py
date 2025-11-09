"""
Configuration for Daily Poster service.
"""

import os
from pathlib import Path
from dotenv import load_dotenv
from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import model_validator
from typing import Optional

# Load .env file manually first so all env vars are available
_project_root = Path(__file__).parent.parent.resolve()
_env_file = _project_root / ".env"
if _env_file.exists():
    load_dotenv(_env_file, override=False)
else:
    load_dotenv(".env", override=False)


class Settings(BaseSettings):
    """Application settings."""
    
    # Server
    port: int = 8500
    host: str = "0.0.0.0"
    
    # xAI (for generating posts)
    xai_api_key: str
    xai_api_base: str = "https://api.x.ai/v1"
    xai_model: str = "grok-3"  # grok-beta deprecated on 2025-09-15
    
    # Supabase (for brand data)
    # Will use NEXT_PUBLIC_SUPABASE_URL if SUPABASE_URL is not set
    supabase_url: Optional[str] = None
    supabase_service_role_key: str
    
    # Composio (for posting to X)
    composio_api_key: str
    
    # Generation settings
    max_tokens: int = 100
    temperature: float = 0.8  # More creative for original content
    
    # Scheduling
    post_time_utc: str = "09:00"  # When to post daily (UTC)
    
    model_config = SettingsConfigDict(
        # Don't specify env_file here since we load it manually above
        # This allows pydantic to read from os.environ which we've populated
        env_file_encoding="utf-8",
        case_sensitive=False,
        extra="ignore",  # Ignore extra fields from .env that we don't use
    )
    
    @model_validator(mode="after")
    def set_supabase_url_from_next_public(self) -> "Settings":
        """Set supabase_url from NEXT_PUBLIC_SUPABASE_URL if SUPABASE_URL is not set."""
        if not self.supabase_url:
            # Try to get from environment (pydantic-settings should have loaded it)
            # Check both the exact name and case variations
            self.supabase_url = (
                os.getenv("SUPABASE_URL") or
                os.getenv("supabase_url") or
                os.getenv("NEXT_PUBLIC_SUPABASE_URL") or 
                os.getenv("next_public_supabase_url")
            )
        # Validate that we have supabase_url
        if not self.supabase_url:
            raise ValueError(
                "supabase_url is required. Set SUPABASE_URL or NEXT_PUBLIC_SUPABASE_URL in .env file."
            )
        return self


# Global settings instance
settings = Settings()

