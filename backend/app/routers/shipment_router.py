from typing import List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.models.shipment import Shipment
from app.schemas.shipment_schema import ShipmentRead, ShipmentCreate

router = APIRouter()


@router.get("/", response_model=List[ShipmentRead])
def list_shipments(db: Session = Depends(get_db)):
    return db.query(Shipment).all()


@router.get("/{shipment_id}", response_model=ShipmentRead)
def read_shipment(shipment_id: int, db: Session = Depends(get_db)):
    shipment = db.query(Shipment).filter(Shipment.id == shipment_id).first()
    if not shipment:
        raise HTTPException(status_code=404, detail="Shipment not found")
    return shipment


@router.post("/", response_model=ShipmentRead, status_code=201)
def create_shipment(payload: ShipmentCreate, db: Session = Depends(get_db)):
    shipment = Shipment(**payload.dict())
    db.add(shipment)
    db.commit()
    db.refresh(shipment)
    return shipment
