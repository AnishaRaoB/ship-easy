from pydantic import BaseModel


class HistoricalShipmentRead(BaseModel):
    id: int
    origin: str
    destination: str
    carrier: str
    weight_kg: float
    distance_km: float
    month: int
    transit_days: float
    delayed: bool

    class Config:
        from_attributes = True


class HistoricalShipmentCreate(BaseModel):
    origin: str
    destination: str
    carrier: str
    weight_kg: float = 0.0
    distance_km: float = 0.0
    month: int
    transit_days: float = 0.0
    delayed: bool = False