from fastapi import FastAPI
from controller.user import router

app = FastAPI(
    title='Rest API Backend',
    summary='Sample bank application to practice REST API with MongoDB.'
)

app.include_router(router)
