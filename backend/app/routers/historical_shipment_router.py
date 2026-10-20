from typing import List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.models.historical_shipment import HistoricalShipment
from app.schemas.historical_shipment_schema import HistoricalShipmentRead, HistoricalShipmentCreate

router = APIRouter()


@router.get("/", response_model=List[HistoricalShipmentRead])
def list_historical_shipments(db: Session = Depends(get_db)):
    return db.query(HistoricalShipment).all()


@router.get("/{historical_shipment_id}", response_model=HistoricalShipmentRead)
def read_historical_shipment(historical_shipment_id: int, db: Session = Depends(get_db)):
    record = db.query(HistoricalShipment).filter(HistoricalShipment.id == historical_shipment_id).first()
    if not record:
        raise HTTPException(status_code=404, detail="Historical shipment not found")
    return record


@router.post("/", response_model=HistoricalShipmentRead, status_code=201)
def create_historical_shipment(payload: HistoricalShipmentCreate, db: Session = Depends(get_db)):
    record = HistoricalShipment(**payload.dict())
    db.add(record)
    db.commit()
    db.refresh(record)
    return record
