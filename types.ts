
export interface CalculationInputs {
  rc: string;
  w: string;
  q100: string;
}

export interface CalculationResults {
  classification: 'Minor Curvature / Straight Reach' | 'Obvious Curvature';
  setbackFactor: 1.0 | 2.5;
  calculatedSetback: number;
  requiredMinimumSetback: number;
  rc: number;
  thresholdRadius: number;
}

export type InputKey = keyof CalculationInputs;