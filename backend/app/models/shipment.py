from sqlalchemy import Boolean, Column, Float, Integer, String
from app.database.database import Base
# check notes in product.py for import explanations
class Shipment(Base):
    __tablename__ = "shipments"

    id = Column(Integer, primary_key=True, index=True)
    origin = Column(String(128), nullable=False)
    destination = Column(String(128), nullable=False)
    carrier = Column(String(64), nullable=False)
    weight_kg = Column(Float, nullable=False, default=0.0)
    distance_km = Column(Float, nullable=False, default=0.0)
    month = Column(Integer, nullable=False)

