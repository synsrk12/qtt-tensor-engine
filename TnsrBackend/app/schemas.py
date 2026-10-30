from pydantic import BaseModel, ConfigDict, Field
from typing import Any, List, Optional

class CalculationRequest(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    jahnSymbol: str = Field(..., alias="jahn")
    mode: str
    selection: List[str] = Field(default_factory=list)
    trs: Optional[str] = ""
    view: Optional[str] = None

    @classmethod
    def model_validate_legacy(cls, data):
        if "jahnSymbol" not in data and "jahn" in data:
            data = {**data, "jahnSymbol": data["jahn"]}
        return cls(**data)

class CalculationResponse(BaseModel):
    jahnSymbol: Optional[str] = None
    mode: Optional[str] = None
    tensorRank: Optional[int] = None
    results: Optional[List[Any]] = None
    status: Optional[str] = None
    message: Optional[str] = None
