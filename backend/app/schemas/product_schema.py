from typing import Optional

from pydantic import BaseModel


class ProductRead(BaseModel):
    id: int
    name: str
    category: str
    perishable: bool
    temperature_sensitive: bool
    priority_level: str
    shelf_life_days: Optional[int]

    class Config:
        from_attributes = True


class ProductCreate(BaseModel):
    name: str
    category: str
    perishable: bool = False
    temperature_sensitive: bool = False
    priority_level: str = "Normal"
    shelf_life_days: Optional[int] = None