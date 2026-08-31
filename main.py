from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from controller.user import user_router
from controller.account import account_router
from controller.login import login_router

app = FastAPI(
    title='Rest API Backend',
    summary='Sample bank application to practice REST API with MongoDB.'
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(user_router)
app.include_router(account_router)
app.include_router(login_router)
