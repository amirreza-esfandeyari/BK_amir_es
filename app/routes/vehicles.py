from fastapi import APIRouter, Depends, HTTPException, status
from pymongo.database import Database
from pymongo.errors import DuplicateKeyError

from app.database import get_database
from app.models.schemas import VehicleCreate

router = APIRouter(
    prefix="/api/vehicles",
    tags=["Vehicles"],
)


@router.post("", status_code=status.HTTP_201_CREATED)
def create_vehicle(
    vehicle: VehicleCreate,
    db: Database = Depends(get_database),
):
    data = vehicle.model_dump(exclude_unset=True)

    try:
        db.vehicles.insert_one(data)
    except DuplicateKeyError:
        raise HTTPException(
            status_code=409,
            detail="Vehicle already exists",
        )

    return {
        "message": "Vehicle created",
        "vehicle_id": vehicle.vehicle_id,
    }


@router.get("")
def list_vehicles(
    db: Database = Depends(get_database),
):
    vehicles = list(
        db.vehicles.find({}, {"_id": 0})
    )

    return {
        "total": len(vehicles),
        "vehicles": vehicles,
    }


@router.get("/{vehicle_id}")
def get_vehicle(
    vehicle_id: str,
    db: Database = Depends(get_database),
):
    vehicle = db.vehicles.find_one(
        {"vehicle_id": vehicle_id},
        {"_id": 0},
    )

    if vehicle is None:
        raise HTTPException(
            status_code=404,
            detail="Vehicle not found",
        )

    return vehicle


@router.delete("/{vehicle_id}")
def delete_vehicle(
    vehicle_id: str,
    db: Database = Depends(get_database),
):

    linked_sessions = db.sessions.find_one(
        {"vehicle_id": vehicle_id}
    )

    if linked_sessions:
        raise HTTPException(
            status_code=409,
            detail="Vehicle has linked sessions",
        )

    result = db.vehicles.delete_one(
        {"vehicle_id": vehicle_id}
    )

    if result.deleted_count == 0:
        raise HTTPException(
            status_code=404,
            detail="Vehicle not found",
        )

    return {"message": "Vehicle deleted"}