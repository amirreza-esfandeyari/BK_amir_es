from fastapi import APIRouter, Depends
from pymongo.database import Database

from app.database import get_database

router = APIRouter(
    prefix="/api/dashboard",
    tags=["Dashboard"],
)


@router.get("/overview")
def dashboard_overview(
    db: Database = Depends(get_database),
):
    vehicles = list(
        db.vehicles.find({}, {"_id": 0})
    )

    total_sessions = db.sessions.count_documents({})
    total_samples = db.samples.count_documents({})
    total_dtcs = db.dtcs.count_documents({})

    vehicle_overview = []

    for vehicle in vehicles:
        vehicle_id = vehicle.get("vehicle_id")

        sessions = list(
            db.sessions.find(
                {"vehicle_id": vehicle_id},
                {"_id": 0},
            ).sort("created_utc", -1).limit(1)
        )

        latest_session = sessions[0] if sessions else None
        latest_sample = None
        latest_dtcs = []

        if latest_session:
            session_id = latest_session.get("session_id")

            latest_sample = db.samples.find_one(
                {"session_id": session_id},
                {"_id": 0},
                sort=[("t_rel_s", -1)],
            )

            latest_dtcs = list(
                db.dtcs.find(
                    {"session_id": session_id},
                    {"_id": 0},
                )
            )

        vehicle_overview.append({
            "vehicle": vehicle,
            "latest_session": latest_session,
            "latest_sample": latest_sample,
            "dtcs": latest_dtcs,
        })

    return {
        "summary": {
            "total_vehicles": len(vehicles),
            "total_sessions": total_sessions,
            "total_samples": total_samples,
            "total_dtcs": total_dtcs,
        },
        "vehicles": vehicle_overview,
    }



