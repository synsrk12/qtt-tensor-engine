import json
from pathlib import Path

from tensor_backend import calculate_tensor as compute_tensor

DATA_DIR = Path(__file__).parent.parent / "data"

with open(DATA_DIR / "point_groups.json", "r") as f:
    POINT_GROUPS = json.load(f)

POINT_GROUP_INFO = {pg["id"]: pg for pg in POINT_GROUPS}


def load_point_groups():
    with open(DATA_DIR / "point_groups.json", "r") as f:
        return json.load(f)


def load_operations():
    with open(DATA_DIR / "operations.json", "r") as f:
        return json.load(f)


def calculate_tensor(data):
    if hasattr(data, "mode"):
        mode = data.mode
        selection = data.selection or []
        trs = data.trs or ""
        jahn = data.jahnSymbol if hasattr(data, "jahnSymbol") else ""
        view = data.view or ""
    else:
        mode = data.get("mode", "")
        selection = data.get("selection", []) or []
        trs = data.get("trs", "")
        jahn = data.get("jahnSymbol") or data.get("jahn", "")
        view = data.get("view", "")

    result = compute_tensor(
        mode=mode,
        selection=selection,
        trs=trs,
        jahn=jahn,
        view=view,
    )

    if mode == "allgroups":
        if view == "table":
            return {
                "jahnSymbol": jahn,
                "mode": "all_groups_table",
                "results": result,
            }
        return {
            "jahnSymbol": jahn,
            "mode": "all_groups_inverse",
            "tensorRank": result["tensorRank"],
            "results": result["results"],
        }

    if mode == "custom":
        return {
            "jahnSymbol": jahn,
            "mode": "custom",
            "results": result["results"],
        }

    group_id = selection[0] if selection else None
    group = POINT_GROUP_INFO.get(group_id)
    display_name = group["displayName"] if group is not None else group_id
    magnetic_type = group["magneticType"] if group is not None else "unknown"

    return {
        "jahnSymbol": jahn,
        "mode": mode,
        "results": [
            {
                "id": group_id,
                "label": selection,
                "displayName": display_name,
                "magnetic": magnetic_type,
                "allowedComponents": result["allowedComponents"],
                "matrix": result["matrix"],
                "relations": result["relations"],
            }
        ],
    }
