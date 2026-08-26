#the schema files help define the return JSON shape of the API endpoints
from pydantic import BaseModel
from typing import Optional

#return the 'get' for the product. this is teh shape of the JSON that will be returned when get a product from the DB 
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
    
    # lets fastapi know that this is a pydantic model that can be used to read data from the DB so then we can return it as JSON. basically lets FASTAPI read the SWLAlchemy model attributes so we can return products.  
    class Config:
        orm_mode = True

#what happens when we create a new product. this is the shape of the JSON that will be sent to the API endpoint when creating a new product.
class HistoricalShipmentCreate(BaseModel):
    
    origin: str
    destination: str
    carrier: str
    weight_kg: float
    distance_km: float
    month: int
    transit_days: float
    delayed: bool = False