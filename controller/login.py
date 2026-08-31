from fastapi import APIRouter, Response, HTTPException
from database import user_collection

login_router = APIRouter()


@login_router.post("/login")
async def login(username: str, response: Response):
    user = await user_collection.find_one({"username": username})
    if not user:
        raise HTTPException(
            status_code=404,
            detail=f"Account {username} not found",
        )

    response.set_cookie(
        key="user_id",
        value=str(user["_id"]),
    )

    response.set_cookie(
        key="role",
        value=str(user["role"]),
    )

    return {
        "message": "Logged in",
        "id": str(user["_id"]),
        "role": user["role"],
    }
