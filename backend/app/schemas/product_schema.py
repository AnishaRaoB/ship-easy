#the schema files help define the return JSON shape of the API endpoints
from pydantic import BaseModel
from typing import Optional

#return the 'get' for the product. this is teh shape of the JSON that will be returned when get a product from the DB 
class ProductRead(BaseModel):
    id: int
    name: str
    category: str
    perishable: bool
    temperature_sensitive: bool
    priority_level: str
    shelf_life_days: Optional[int]

    # lets fastapi know that this is a pydantic model that can be used to read data from the DB so then we can return it as JSON. basically lets FASTAPI read the SWLAlchemy model attributes so we can return products.  
    class Config:
        orm_mode = True

#what happens when we create a new product. this is the shape of the JSON that will be sent to the API endpoint when creating a new product.
class ProductCreate(BaseModel):
    name: str
    category: str
    perishable: bool = False
    temperature_sensitive: bool = False
    priority_level: str = "Normal"
    shelf_life_days: Optional[int] = None #