from pymongo import MongoClient
from pymongo.database import Database

from app.config import MONGO_URI, MONGO_DB

client: MongoClient | None = None
db: Database | None = None


def connect_to_mongo() -> None:
    global client, db

    if not MONGO_URI:
        raise RuntimeError(
            "MONGO_URI is not configured in the environment"
        )

    client = MongoClient(
        MONGO_URI,
        serverSelectionTimeoutMS=5000,
        tz_aware=True,
    )

    client.admin.command("ping")

    db = client[MONGO_DB]

    print("MongoDB connected successfully!")

def close_mongo_connection() -> None:
    global client, db

    if client is not None:
        client.close()

    client = None
    db = None


def get_database() -> Database:
    if db is None:
        raise RuntimeError("MongoDB is not connected")

    return db