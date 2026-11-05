from fastapi import APIRouter, Depends, HTTPException, status
from pymongo import ASCENDING
from pymongo.database import Database
from pymongo.errors import DuplicateKeyError

from app.database import get_database
from app.models.schemas import (
    SampleCreate,
    DTCCreate,
    SupportedPIDCreate,
)

router = APIRouter(
    prefix="/api",
    tags=["Telemetry"],
)


def ensure_session_exists(db: Database, session_id: str):
    if db.sessions.find_one(
        {"session_id": session_id},
        {"_id": 1},
    ) is None:
        raise HTTPException(
            status_code=404,
            detail="Session not found",
        )


@router.post("/samples", status_code=status.HTTP_201_CREATED)
def create_sample(
    sample: SampleCreate,
    db: Database = Depends(get_database),
):
    ensure_session_exists(db, sample.session_id)

    data = sample.model_dump(exclude_unset=True)

    try:
        db.samples.insert_one(data)
    except DuplicateKeyError:
        raise HTTPException(
            status_code=409,
            detail="Sample already exists for this session and t_rel_s",
        )

    return {"message": "Sample saved"}


@router.get("/sessions/{session_id}/samples")
def list_samples(
    session_id: str,
    limit: int = 100,
    db: Database = Depends(get_database),
):
    ensure_session_exists(db, session_id)

    if not 1 <= limit <= 1000:
        raise HTTPException(
            status_code=422,
            detail="limit must be between 1 and 1000",
        )

    samples = list(
        db.samples.find(
            {"session_id": session_id},
            {"_id": 0},
        )
        .sort("t_rel_s", ASCENDING)
        .limit(limit)
    )

    return {
        "session_id": session_id,
        "total": len(samples),
        "samples": samples,
    }


@router.post("/dtcs", status_code=status.HTTP_201_CREATED)
def create_dtc(
    item: DTCCreate,
    db: Database = Depends(get_database),
):
    ensure_session_exists(db, item.session_id)

    try:
        db.dtcs.insert_one(item.model_dump())
    except DuplicateKeyError:
        raise HTTPException(
            status_code=409,
            detail="This DTC already exists for the session",
        )

    return {"message": "DTC saved"}


@router.get("/sessions/{session_id}/dtcs")
def list_dtcs(
    session_id: str,
    db: Database = Depends(get_database),
):
    ensure_session_exists(db, session_id)

    items = list(
        db.dtcs.find(
            {"session_id": session_id},
            {"_id": 0},
        )
    )

    return {
        "session_id": session_id,
        "total": len(items),
        "dtcs": items,
    }


@router.post(
    "/supported-pids",
    status_code=status.HTTP_201_CREATED,
)
def create_supported_pid(
    item: SupportedPIDCreate,
    db: Database = Depends(get_database),
):
    ensure_session_exists(db, item.session_id)

    try:
        db.supported_pids.insert_one(
            item.model_dump()
        )
    except DuplicateKeyError:
        raise HTTPException(
            status_code=409,
            detail="This PID already exists for the session",
        )

    return {"message": "Supported PID saved"}


@router.get("/sessions/{session_id}/supported-pids")
def list_supported_pids(
    session_id: str,
    db: Database = Depends(get_database),
):
    ensure_session_exists(db, session_id)

    items = list(
        db.supported_pids.find(
            {"session_id": session_id},
            {"_id": 0},
        )
    )

    return {
        "session_id": session_id,
        "total": len(items),
        "supported_pids": items,
    }