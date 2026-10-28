export type CalculationMode =
  | "point_group"
  | "operation"
  | "custom_group"
  | "all_groups_table"
  | "all_groups_inverse";

export interface CalculateRequest {
  jahnSymbol: string;
  mode: CalculationMode;
  selection: string[];
  trs: "0" | "1";

  view?: "table" | "inverse";
}

export interface TensorMatrixData {
  symbol: string;
  rows: any;
}

export interface TensorRelation {
  lhs: string;
  rhs: string;
}

export interface TensorResult {
  id: string;
  label: string;
  displayName?: string;
  pointGroup?: string;
  operation?: string;

  magnetic: string;

  numberOfGenerators: number;

  operations: PointGroupOperation[];
  independentComponents?: string[];

  allowedComponents: string[] | number[][];
  matrix: TensorMatrixData;
  relations: TensorRelation[];
}

export interface CalculateResponse {
  jahnSymbol: string;
  mode: CalculationMode;
  results: TensorResult[];
}

export interface PointGroupOperation {
  id: string;
  displayName: string;
  type: string;
  matrix: string[][];
  groupName: string;
}

export interface PointGroupEntry {
  id: string;
  displayName: string;
  latex?: string;
  backendName: string;
  magneticType: string;
  numberOfGenerators: number;
  operations: PointGroupOperation[];
}

export interface OperationEntry {
  id: string;
  displayName: string;
  latex: string;
}

export interface SelectOption {
  value: string;
  label: string;
  latex?: string;
}

export type Status = 'ready' | 'calculating' | 'finished' | 'error';
