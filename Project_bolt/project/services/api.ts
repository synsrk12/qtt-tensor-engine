import type {
  CalculateRequest,
  CalculateResponse,
} from "@/types";

export async function calculateTensor(
  request: CalculateRequest
): Promise<CalculateResponse> {

  let backendMode = "";
  let backendView = "";

  switch (request.mode) {

    case "point_group":
      backendMode = "pointgroup";
      break;

    case "operation":
      backendMode = "operation";
      break;

    case "all_groups_table":
      backendMode = "allgroups";
      backendView = "table";
      break;

    case "all_groups_inverse":
      backendMode = "allgroups";
      backendView = "inverse";
      break;

    case "custom_group":
      backendMode = "custom";
      break;
  }

  const res = await fetch("/api/calculate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      mode: backendMode,
      view: backendView,
      selection: request.selection,
      trs: request.trs,
      jahn: request.jahnSymbol,
    }),
  });

  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({}));

    throw new Error(
      errorBody.error ?? `Request failed (${res.status})`
    );
  }

  return await res.json();
}
