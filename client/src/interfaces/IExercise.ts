export interface IExerciseFilter {
  filter: string;
  bodyPart: string;
  target: string;
  equipment: string;
  type: string;
}

export interface IExerciseCreate extends IExerciseFilter {
  sets: number;
  reps: number;
  duration: number;
}

export interface IExerciseUtils {
  equipment: string[];
  target: string[];
  bodyParts: string[];
  types: string[];
}

export interface IExercise {
  exerciseId: string;
  bodyParts: string[];
  equipments: string[];
  imageUrl: string;
  videoUrl: string;
  instructions: string[];
  exerciseType: string;
  name: string;
  secondaryTarget: string[];
  targetMuscles: string[];
  exerciseTips: string[];
  variations: string[];
}

export interface IMeta {
  nextCursor?: string;
  previousCursor?: string;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface IRequestParams {
  limit: number;
  after?: string;
  before?: string;
}
