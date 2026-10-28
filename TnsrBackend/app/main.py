from fastapi import FastAPI
from app.routes import router

app = FastAPI(
    title="TensorSym Backend",
    description="Backend API for TensorSym",
    version="0.1.0"
)

app.include_router(router)
