from bson import ObjectId
from database import user_collection, ReturnDocument


async def get_user(id: str):
    user = await user_collection.find_one({"_id": ObjectId(id)})
    if user is not None:
        return user


async def get_users():
    users = await user_collection.find().to_list()
    if users is not None:
        return users


async def create_user(user):
    new_user = user.model_dump()
    result = await user_collection.insert_one(new_user)
    new_user["id"] = result.inserted_id

    return new_user


async def delete_user(id: str):
    result = await user_collection.delete_one({"_id": ObjectId(id)})
    if result.deleted_count == 1:
        return result


async def update_user(id, user):
    user = {
        k: v for k, v in user.model_dump(by_alias=True).items() if v is not None
    }

    if len(user) >= 1:
        update_result = await user_collection.find_one_and_update(
            {"_id": ObjectId(id)},
            {"$set": user},
            return_document=ReturnDocument.AFTER,
        )
        if update_result is not None:
            return update_result

    if (existing_user := await user_collection.find_one({"_id": id}) is not None):
        return existing_user
