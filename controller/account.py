from models.account import *
from services.account import *
from fastapi import APIRouter, HTTPException, status

account_router = APIRouter()


@account_router.post(
    "/accounts",
    response_description="Create a new account",
    response_model=AccountOut,
    response_model_by_alias=False,
    status_code=status.HTTP_201_CREATED,
)
async def create_account_endpoint(account: AccountIn):
    new_account = await create_account(account)
    if new_account is None:
        raise HTTPException(
            status_code=400,
            detail="Unable to create account",
        )

    return new_account


@account_router.get(
    "/accounts",
    response_description="Get all accounts",
    response_model=AccountCollection,
    response_model_by_alias=False,
)
async def get_accounts_endpoint():
    accounts = await get_accounts()

    if accounts is None:
        raise HTTPException(
            status_code=404,
            detail="There are no accounts",
        )

    return {"accounts": accounts}


@account_router.get(
    "/accounts/{id}",
    response_description="Get a single account",
    response_model=AccountOut,
    response_model_by_alias=False,
)
async def get_account_endpoint(id: str):
    if (account := await get_account(id)) is None:
        raise HTTPException(
            status_code=404,
            detail=f"Account {id} not found",
        )

    return account


@account_router.get(
    "/users/{id}/accounts",
    response_description="Get a user's accounts",
    response_model=AccountCollection,
    response_model_by_alias=False,
)
async def get_accounts_for_user_endpoint(id: str):
    if (accounts := await get_accounts_for_user(id)) is None:
        raise HTTPException(
            status_code=404,
            detail=f"Account {id} not found",
        )

    return {"accounts": accounts}


@account_router.put(
    "/accounts/{id}",
    response_description="Update an account",
    response_model=AccountOut,
    response_model_by_alias=False,
)
async def update_account_endpoint(
    id: str,
    account: AccountUpdate,
):
    updated_account = await update_account(id, account)

    if updated_account is None:
        raise HTTPException(
            status_code=404,
            detail=f"Account {id} not found",
        )

    return updated_account


@account_router.delete(
    "/accounts/{id}",
    response_description="Delete an account",
    status_code=status.HTTP_204_NO_CONTENT,
)
async def delete_account_endpoint(id: str):
    deleted = await delete_account(id)

    if not deleted:
        raise HTTPException(
            status_code=404,
            detail=f"Account {id} not found",
        )
