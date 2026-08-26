from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers.product_router import router as product_router

app = FastAPI(
    title="Shipping Risk Predictor API",
    version="0.1.0",
    description="Backend for the Ship-Easy decision-support platform.",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8443", "http://10.0.0.103:8443"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "Shipping Risk Predictor API", "status": "running"}


@app.get("/health")
def health():
    return {"status": "healthy"}


app.include_router(product_router, prefix="/products", tags=["products"])
