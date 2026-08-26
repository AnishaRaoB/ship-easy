from sqlalchemy import Boolean, Column, Integer, String
from app.database.database import Base
#from sqlalchemy we have to import Boolean, Column, Float, Integer, String in order to create our column's datatypes. we also import Base from our database.py file in order to create the Product class which is used to create the "products" table

class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(128), nullable=False)
    category = Column(String(64), nullable=False)
    perishable = Column(Boolean, default=False, nullable=False)
    temperature_sensitive = Column(Boolean, default=False, nullable=False)
    priority_level = Column(String(32), nullable=False, default="Normal")
    shelf_life_days = Column(Integer, nullable=True)