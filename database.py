import os
from dotenv import load_dotenv
from pymongo import AsyncMongoClient, ReturnDocument

load_dotenv()
MONGODB_URL = os.environ['MONGODB_URL']

client = AsyncMongoClient(MONGODB_URL)
db = client.bank_db

user_collection = db.get_collection('users')
