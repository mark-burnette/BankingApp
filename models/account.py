from pydantic import BaseModel, Field
from .user import PyObjectId

from decimal import Decimal
from typing import Literal, List


class AccountOut(BaseModel):
    id: PyObjectId = Field(alias="_id")
    user: PyObjectId
    type: Literal["checking", "savings"]
    balance: Decimal


class AccountIn(BaseModel):
    user: PyObjectId
    type: Literal["checking", "savings"]
    balance: Decimal


class AccountCollection(BaseModel):
    accounts: List[AccountOut]


class AccountUpdate(BaseModel):
    type: Literal["checking", "savings"] | None
    balance: Decimal | None
