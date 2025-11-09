"""
Post approval system - Send posts for iMessage approval before posting to X.
"""

import uuid
from typing import Optional
from pydantic import BaseModel
import httpx


class PostCandidate(BaseModel):
    """A post candidate waiting for approval."""
    id: str
    brand_id: str
    brand_name: str
    post_text: str
    platform: str = "x"  # x, reddit, etc.
    theme: Optional[str] = None
    owner_imessage: Optional[str] = None


class PostDecision(BaseModel):
    """Decision made on a post candidate."""
    candidate_id: str
    action: str  # "approved", "rejected", "edited"
    edited_text: Optional[str] = None
    timestamp: str


async def send_for_approval(
    candidate: PostCandidate,
    imessage_client,
    photon_to: str
) -> str:
    """
    Send a post for iMessage approval.
    
    Args:
        candidate: Post candidate
        imessage_client: iMessage client instance
        photon_to: Fallback iMessage recipient
    
    Returns:
        Candidate ID
    """
    recipient = candidate.owner_imessage or photon_to
    
    if not recipient:
        raise ValueError("No iMessage recipient specified")
    
    # Format message
    message_text = (
        f"🤖 {candidate.brand_name} - New Post\n\n"
        f"ID: {candidate.id}\n"
        f"Platform: {candidate.platform.upper()}\n"
        f"{f'Theme: {candidate.theme}' if candidate.theme else ''}\n\n"
        f"Post:\n{candidate.post_text}\n\n"
        f"Commands:\n"
        f"• approve {candidate.id}\n"
        f"• edit {candidate.id}: <your changes>\n"
        f"• skip {candidate.id}"
    )
    
    # Send via iMessage
    try:
        await imessage_client.http_client.post(
            f"{imessage_client.base_url}/send",
            json={
                "recipient": recipient,
                "text": message_text
            }
        )
        print(f"✅ Sent post {candidate.id} for approval to {recipient}")
        return candidate.id
    except Exception as e:
        print(f"❌ Failed to send approval request: {e}")
        raise


async def post_to_x(brand_id: str, text: str, frontend_url: str = "http://localhost:3000") -> dict:
    """
    Post to X using the existing Composio API.
    
    IMPORTANT: Composio uses brand_id as userId (same as Activity Feed does)
    This is how Twitter was connected - using brand_id as the Composio userId.
    
    Args:
        brand_id: Brand ID (from brand_agent table) - used as userId for Composio
        text: Tweet text
        frontend_url: URL of frontend (where Composio API is)
    
    Returns:
        Result dict with success status and tweet URL
    """
    try:
        # Use brand_id as userId for Composio (same as Activity Feed does)
        # Twitter was connected using brand_id as the Composio userId
        print(f"📤 Posting to X with brand_id (as userId): {brand_id}, text length: {len(text)}")
        
        async with httpx.AsyncClient() as client:
            response = await client.post(
                f"{frontend_url}/api/composio/post-tweet",
                json={
                    "userId": brand_id,  # Use brand_id as userId (like Activity Feed does)
                    "text": text
                },
                timeout=30.0
            )
            
            if response.status_code == 200:
                data = response.json()
                print(f"📬 Composio response: {data}")
                
                # Extract tweet ID from nested response
                tweet_id = data.get("tweetId")
                if not tweet_id and "fullResult" in data:
                    full_result = data.get("fullResult", {})
                    result_data = full_result.get("data", {})
                    tweet_id = result_data.get("id") or result_data.get("tweet_id") or result_data.get("id_str")
                
                # Build tweet URL
                tweet_url = data.get("url")
                if not tweet_url and tweet_id:
                    tweet_url = f"https://x.com/i/status/{tweet_id}"
                
                if not tweet_id or not tweet_url:
                    # Treat as failure so user isn't told it posted when it didn't
                    error_msg = (
                        "Tweet ID/URL missing from Composio response. "
                        "Check frontend logs for /api/composio/post-tweet."
                    )
                    print(f"⚠️  {error_msg}")
                    return {
                        "success": False,
                        "error": error_msg,
                        "raw": data
                    }
                
                print(f"✅ Post successful! Tweet ID: {tweet_id}, URL: {tweet_url}")
                
                return {
                    "success": True,
                    "tweet_id": tweet_id,
                    "url": tweet_url,
                    "message": data.get("message", "Tweet posted successfully")
                }
            else:
                return {
                    "success": False,
                    "error": f"API returned {response.status_code}: {response.text}"
                }
    except Exception as e:
        return {
            "success": False,
            "error": str(e)
        }


def generate_post_id() -> str:
    """Generate a unique post candidate ID."""
    return f"post_{uuid.uuid4().hex[:12]}"
