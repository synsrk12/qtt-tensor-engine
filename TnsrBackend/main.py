from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from tensor_backend import calculate_tensor
import json
from pprint import pprint

app = FastAPI()

with open("data/point_groups.json", "r") as f:
    point_groups = json.load(f)


POINT_GROUP_INFO = {
    pg["id"]: pg
    for pg in point_groups
}

#print("Loaded", len(POINT_GROUP_DISPLAY), "point groups")
#print("Sample:", list(POINT_GROUP_DISPLAY.items())[:5])

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],      # We will restrict this later
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class TensorRequest(BaseModel):
    mode: str
    selection: List[str]
    trs: str
    jahn: str
    view: str | None = None

@app.get("/")
def home():
    return {"message": "Tensor Backend is running!"}


@app.post("/calculate")
def calculate(request: TensorRequest):

    result = calculate_tensor(
       mode=request.mode,
       selection=request.selection,
       trs=request.trs,
       jahn=request.jahn,
       view=request.view,
    )
    
   # print(type(result))
   # print(result if isinstance(result, dict) else result[:2])
    
    if request.mode == "allgroups":

      if request.view == "table":
        return {
            "jahnSymbol": request.jahn,
            "mode": "all_groups_table",
            "results": result,
        }

      else:
        return {
            "jahnSymbol": request.jahn,
            "mode": "all_groups_inverse",
            "tensorRank": result["tensorRank"],
            "results": result["results"],
        }
	    
    if request.mode == "custom":
      return {
        "jahnSymbol": request.jahn,
        "mode": "custom",
        "results": result["results"],
      }

    group_id = request.selection[0] if request.selection else None
    group = POINT_GROUP_INFO.get(group_id)
    
    display_name = (group["displayName"]
      if group is not None
      else group_id)
    
    magnetic_type = (group["magneticType"]
      if group is not None
      else "unknown")
    
    return {
        "jahnSymbol": request.jahn,
        "mode": request.mode,
        "results": [
            {
                "id": group_id,
                "label": request.selection,
                "displayName": display_name,
                "magnetic": magnetic_type,
                "allowedComponents": result["allowedComponents"],
                "matrix": result["matrix"],
                "relations": result["relations"],
            }
        ],
    }
