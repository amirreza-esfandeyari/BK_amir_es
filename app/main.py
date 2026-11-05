from contextlib import asynccontextmanager

from fastapi import FastAPI

from app.database import (
    connect_to_mongo,
    close_mongo_connection,
)
from app.routes import health, vehicles, sessions, telemetry, dashboard



@asynccontextmanager
async def lifespan(app: FastAPI):
    connect_to_mongo()

    try:
        yield
    finally:
        close_mongo_connection()


app = FastAPI(
    title="Vehicle Monitoring API",
    description="Backend API for vehicle and OBD telemetry monitoring",
    version="1.0.0",
    lifespan=lifespan,
)

app.include_router(health.router)
app.include_router(vehicles.router)
app.include_router(sessions.router)
app.include_router(telemetry.router)
app.include_router(dashboard.router)


@app.get("/")
def root():
    return {
        "message": "Vehicle Monitoring API is running",
        "docs": "/docs",
    }


