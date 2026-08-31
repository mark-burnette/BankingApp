from bson import ObjectId, Decimal128
from database import account_collection
from models.account import *


async def create_account(account: AccountIn):
    new_account = account.model_dump()
    new_account["balance"] = Decimal128(
        str(new_account["balance"])
    )
    result = await account_collection.insert_one(new_account)
    new_account["id"] = result.inserted_id
    new_account["balance"] = new_account["balance"].to_decimal()

    return new_account


async def get_accounts():
    accounts = await account_collection.find().to_list()
    for account in accounts:
        account["balance"] = account["balance"].to_decimal()
    return accounts


async def get_accounts_for_user(user: str):
    accounts = await account_collection.find({"user": user}).to_list()
    for account in accounts:
        account["balance"] = account["balance"].to_decimal()
    return accounts


async def get_account(id: str):
    account = await account_collection.find_one({
        "_id": ObjectId(id)
    })
    if account is None:
        return None

    account["balance"] = account["balance"].to_decimal()
    return account


async def update_account(
    id: str,
    account: AccountUpdate,
):
    updates = account.model_dump(exclude_unset=True)
    if not updates:
        return None

    updates["balance"] = Decimal128(
        str(updates["balance"])
    )

    result = await account_collection.update_one(
        {"_id": ObjectId(id)},
        {"$set": updates},
    )

    if result.matched_count == 0:
        return None

    account = await account_collection.find_one({
        "_id": ObjectId(id)
    })

    account["balance"] = account["balance"].to_decimal()

    return account


async def delete_account(id: str):
    result = await account_collection.delete_one({
        "_id": ObjectId(id)
    })

    return result.deleted_count > 0
