from pydantic import ConfigDict, BaseModel, BeforeValidator, Field
from typing import Optional, List
from typing_extensions import Annotated

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


class UpdateUserModel(BaseModel):
    name: Optional[str] = None
    username: Optional[str] = None
    role: Optional[str] = None
    model_config = ConfigDict(
        json_schema_extra={
            "example": {
                "name": "Jane Doe",
                "username": "jdoe",
                "role": "admin",
            }
        },
    )
