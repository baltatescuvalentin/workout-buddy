export interface IBMICalculator {
  height: number;
  weight: number;
}

export interface ITDEECalculator {
  age: number;
  sex: string;
  height: number;
  weight: number;
  activity: number;
}

export interface IBodyFatCalculator {
  sex: string;
  waist: number;
  neck: number;
  height: number;
  hip?: number;
}

export interface IMacroCalculator {
  calories: number;
  weight: number;
  goal: Goal;
}

export type Goal = "loss" | "maintain" | "gain";

export interface Macros {
  protein: number;
  fat: number;
  carbs: number;
}
