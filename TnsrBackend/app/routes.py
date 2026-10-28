from fastapi import APIRouter
from app.schemas import CalculationRequest
from app.services import (calculate_tensor,load_point_groups,load_operations)

router = APIRouter()

@router.post("/calculate")
async def calculate(request: CalculationRequest):
    return calculate_tensor(request)
    
@router.get("/point-groups")
async def point_groups():
    return load_point_groups()    
    
@router.get("/operations")
async def operations():
    return load_operations()    
