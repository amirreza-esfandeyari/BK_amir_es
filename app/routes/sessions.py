from fastapi import APIRouter, Depends, HTTPException, status
from pymongo.database import Database
from pymongo.errors import DuplicateKeyError

from app.database import get_database
from app.models.schemas import SessionCreate

router = APIRouter(
    prefix="/api/sessions",
    tags=["Sessions"],
)


@router.post("", status_code=status.HTTP_201_CREATED)
def create_session(
    session: SessionCreate,
    db: Database = Depends(get_database),
):
    data = session.model_dump(exclude_unset=True)

    vehicle_id = data.get("vehicle_id")

    if vehicle_id is not None:
        vehicle = db.vehicles.find_one(
            {"vehicle_id": vehicle_id}
        )

        if vehicle is None:
            raise HTTPException(
                status_code=404,
                detail="Referenced vehicle not found",
            )

    try:
        db.sessions.insert_one(data)
    except DuplicateKeyError:
        raise HTTPException(
            status_code=409,
            detail="Session already exists",
        )

    return {
        "message": "Session created",
        "session_id": session.session_id,
    }


@router.get("")
def list_sessions(
    vehicle_id: str | None = None,
    db: Database = Depends(get_database),
):
    query = {}

    if vehicle_id is not None:
        query["vehicle_id"] = vehicle_id

    sessions = list(
        db.sessions.find(query, {"_id": 0})
        .sort("created_utc", -1)
    )

    return {
        "total": len(sessions),
        "sessions": sessions,
    }


@router.get("/{session_id}")
def get_session(
    session_id: str,
    db: Database = Depends(get_database),
):
    session = db.sessions.find_one(
        {"session_id": session_id},
        {"_id": 0},
    )

    if session is None:
        raise HTTPException(
            status_code=404,
            detail="Session not found",
        )

    return session