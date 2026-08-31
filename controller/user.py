from fastapi import APIRouter, Body, HTTPException, status
from models.user import UserOut, UserIn, UserCollection, UpdateUserModel
from services.user import *

user_router = APIRouter()


@user_router.get(
    "/users/{id}",
    response_description="Get a single user",
    response_model=UserOut,
    response_model_by_alias=False,
)
async def get_user_endpoint(id: str):
    if (user := await get_user(id)) is None:
        raise HTTPException(status_code=404, detail=f"User {id} not found")

    return user


@user_router.get(
    "/users",
    response_description="Get a list of all users",
    response_model=UserCollection,
    response_model_by_alias=False,
    status_code=status.HTTP_200_OK,
)
async def get_users_endpoint():
    if (users := await get_users()) is None:
        raise HTTPException(status_code=404, detail=f"There are no users.")

    return {"users": users}


@user_router.post(
    "/users/",
    response_description="Create a new user",
    response_model=UserOut,
    response_model_by_alias=False,
    status_code=status.HTTP_201_CREATED,
)
async def create_user_endpoint(user: UserIn = Body(...)):
    return await create_user(user)


@user_router.delete(
    "/users/{id}",
    response_description="Delete a user",
    status_code=status.HTTP_204_NO_CONTENT
)
async def delete_user_endpoint(id: str):
    if (result := await delete_user(id)) is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Student {id} not found."
        )


@user_router.put("/users/{id}",
                 response_description="Update a user",
                 response_model=UserOut,
                 response_model_by_alias=False,
                 )
async def update_user_endpoint(id: str, user: UpdateUserModel = Body(...)):
    if (updated_user := await update_user(id, user)) is not None:
        return updated_user

    raise HTTPException(status_code=400, detail=f"User {id} not found")
