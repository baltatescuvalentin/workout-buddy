import type { IExerciseUtils } from "./IExercise";

export interface IUserProfile {
  fullName: string;
  userName: string;
  email: string;
  sex: string;
  age: number;
  height: number;
  weight: number;
  hips?: number;
  neck?: number;
  waist?: number;
}

export interface IUser {
  user: IUserProfile;
  token: string;
  sidebar?: boolean;
  exercisesUtils?: IExerciseUtils;
}
