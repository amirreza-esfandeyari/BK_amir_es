from datetime import datetime
from typing import Literal

from pydantic import BaseModel, ConfigDict, Field


EngineState = Literal[
    "off",
    "cranking",
    "running",
    "unknown",
]

DataSource = Literal[
    "elm327",
    "simulated",
]

ConditionLabel = Literal[
    "normal",
    "weak_battery",
    "charging_fault",
    "overheat",
    "lean_mixture",
]


class VehicleCreate(BaseModel):
    model_config = ConfigDict(extra="forbid")

    vehicle_id: str = Field(min_length=1)
    make: str | None = None
    model: str | None = None
    model_year: int | None = None
    ecu_maker: str | None = None
    ecu_type: str | None = None
    ecu_part_no: str | None = None


class SessionCreate(BaseModel):
    model_config = ConfigDict(extra="forbid")

    session_id: str = Field(min_length=1)
    created_utc: datetime
    source: DataSource
    label: ConditionLabel | None = None
    protocol: str | None = None
    port: str | None = None
    mil_on: bool | None = None
    vehicle_id: str | None = None


class SampleCreate(BaseModel):
    model_config = ConfigDict(extra="forbid")

    session_id: str = Field(min_length=1)
    t_rel_s: float
    epoch: float
    engine_state: EngineState

    adapter_voltage: float | None = None
    rpm: float | None = None
    coolant_temp: float | None = None
    speed: float | None = None
    throttle: float | None = None
    engine_load: float | None = None
    map: float | None = None
    intake_air_temp: float | None = None
    stft_b1: float | None = None
    ltft_b1: float | None = None
    o2_b1s1_v: float | None = None
    o2_b1s2_v: float | None = None
    ctrl_module_voltage: float | None = None
    maf: float | None = None
    timing_advance: float | None = None
    run_time: float | None = None
    dist_with_mil: float | None = None
    ambient_temp: float | None = None
    label: ConditionLabel | None = None


class DTCCreate(BaseModel):
    model_config = ConfigDict(extra="forbid")

    session_id: str = Field(min_length=1)
    code: str = Field(min_length=1)


class SupportedPIDCreate(BaseModel):
    model_config = ConfigDict(extra="forbid")

    session_id: str = Field(min_length=1)
    pid: str = Field(min_length=1)
    logged: bool