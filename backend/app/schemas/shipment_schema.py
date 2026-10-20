from pydantic import BaseModel


class ShipmentRead(BaseModel):
    id: int
    origin: str
    destination: str
    carrier: str
    weight_kg: float
    distance_km: float
    month: int

    class Config:
        from_attributes = True


class ShipmentCreate(BaseModel):
    origin: str
    destination: str
    carrier: str
    weight_kg: float = 0.0
    distance_km: float = 0.0
    month: int