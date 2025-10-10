import type { IExercise } from "./IExercise";

export interface IExerciseCreateSave extends IExercise {
  reps?: number;
  duration?: number;
  sets?: number;
}

export interface IDay {
  dayName: string;
  name: string;
  exercises: IExerciseCreateSave[] | [];
}

export interface IWorkout {
  name: string;
  description: string;
  days: Record<string, IDay>;
}

export interface IWorkoutFormTitles {
  title: string;
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;
}
