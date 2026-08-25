import os
from dotenv import load_dotenv
from fastapi import FastAPI, Body, HTTPException, status
from pymongo import AsyncMongoClient
from pydantic import BaseModel, BeforeValidator, Field
from bson import ObjectId
from typing import Optional, List
from typing_extensions import Annotated

load_dotenv()
MONGODB_URL = os.environ['MONGODB_URL']

app = FastAPI(
    title='Rest API Backend',
    summary='Sample bank application to practice REST API with MongoDB.'
    )

client = AsyncMongoClient(MONGODB_URL)
db = client.bank_db

user_collection = db.get_collection('users')

PyObjectId = Annotated[str, BeforeValidator(str)]

class UserOut(BaseModel):
    id: PyObjectId = Field(alias="_id")
    name: str
    username: str
    role: str

class UserIn(BaseModel):
    name: str
    username: str
    role: str

class UserCollection(BaseModel):
    users: List[UserOut]

@app.get(
    "/user/{id}",
    response_description="Get a single user",
    response_model=UserOut,
    response_model_by_alias=False,
)
async def get_user(id: str):
    user = await user_collection.find_one({"_id":ObjectId(id)})
    if (user is not None):
        return user

    raise HTTPException(status_code=404, detail=f"User {id} not found")

@app.get(
    "/users",
    response_description="Get a list of all users",
    response_model=UserCollection,
    response_model_by_alias=False,
    status_code=status.HTTP_201_CREATED,
)
async def get_users():
    users = user_collection.find()
    if (users is not None):
        return {"users": await users.to_list()}

    raise HTTPException(status_code=404, detail=f"There are no users.")

@app.post(
    "/users/",
    response_description="Create a new user",
    response_model=UserOut,
    response_model_by_alias=False,
    status_code=status.HTTP_201_CREATED,
)
async def create_user(user: UserIn = Body(...)):
    # TODO currently just takes submitted body and tries to insert it into collection
    # error check

    new_user = user.model_dump()
    result = await user_collection.insert_one(new_user)
    new_user["id"] = result.inserted_id

    return new_user

@app.delete(
    "/user",
    response_description="Delete a user",
    status_code=status.HTTP_204_NO_CONTENT
)
async def delete_user(id: str):
    result = await user_collection.delete_one({"_id":ObjectId(id)})
    if result.deleted_count == 1:
        return
    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=f"Student {id} not found."
        )