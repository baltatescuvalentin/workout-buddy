import type { Goal, Macros } from "../interfaces/ICalculator";

export function calculateBMI(weight: number, height: number) {
  const height_m: number = height / 100;
  const bmi: number = weight / (height_m * height_m);

  let status: string = "";

  switch (true) {
    case bmi >= 18.5 && bmi < 25:
      status = "Normal weight";
      break;
    case bmi >= 25 && bmi < 30:
      status = "Overweight";
      break;
    case bmi >= 30 && bmi < 35:
      status = "Obesity (Class I)";
      break;
    case bmi >= 35 && bmi < 40:
      status = "Obesity (Class II)";
      break;
    case bmi >= 40:
      status = "Obesity (Class III)";
      break;
    default:
      status = "Invalid BMI";
      break;
  }

  return {
    bmi: parseFloat(bmi.toFixed(2)),
    status,
  };
}

export function calculateTDEE(
  weight: number,
  height: number,
  age: number,
  activity: number,
  sex: string
) {
  let tdee = 0;
  if (sex === "male") {
    const bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    tdee = bmr * activity;
  } else {
    const bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    tdee = bmr * activity;
  }

  return parseFloat(tdee.toFixed(2));
}

export function calculateBodyFat(
  height: number,
  waist: number,
  neck: number,
  hip: number,
  sex: string
) {
  let BFP = 0;

  if (sex === "male") {
    BFP =
      86.01 * Math.log10(waist - neck) - 70.041 * Math.log10(height) + 36.76;
  } else {
    BFP =
      163.205 * Math.log10(waist + hip - neck) -
      97.684 * Math.log10(height) -
      78.387;
  }

  return parseFloat(BFP.toFixed(2));
}

export function calculateMacros(
  weight: number,
  calories: number,
  goal: Goal
): Macros {
  let proteinFactor = 2.0;
  if (goal === "gain") proteinFactor = 1.8;
  if (goal === "maintain") proteinFactor = 1.6;

  const proteinG = weight * proteinFactor;
  const proteinCalories = proteinG * 4;

  let fatPercentage = 0.25;
  if (goal === "gain") fatPercentage = 0.3;
  if (goal === "loss") fatPercentage = 0.25;

  const fatCalories = calories * fatPercentage;
  const fatG = fatCalories / 9;

  const carbCalories = calories - (proteinCalories + fatCalories);
  const carbsG = carbCalories / 4;

  return {
    protein: parseFloat(proteinG.toFixed(1)),
    fat: parseFloat(fatG.toFixed(1)),
    carbs: parseFloat(carbsG.toFixed(1)),
  };
}
