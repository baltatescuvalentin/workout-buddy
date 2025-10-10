import { ClipLoader } from "react-spinners";
import type { IExercise } from "../../../interfaces/IExercise";
import type { IExerciseCreateSave } from "../../../interfaces/IWorkouts";
import { FaTimes } from "react-icons/fa";
import Dialog from "./Dialog";

interface IExerciseDialogInfo {
  open: boolean;
  exercise: IExercise | IExerciseCreateSave | null;
  close: () => void;
  loading: boolean;
}

function ExerciseDialogInfo({
  open,
  close,
  exercise,
  loading,
}: IExerciseDialogInfo) {
  return (
    <Dialog
      showModal={open}
      styles="sm:!min-w-3xl !overflow-y-auto no-scrollbar"
    >
      {loading || !exercise ? (
        <div className="flex flex-row items-center justify-center">
          <ClipLoader color="var(--main-blue)" size={26} />
        </div>
      ) : (
        <div className="flex flex-col gap-4 ">
          <div className="flex flex-row items-center justify-between ">
            <p className="text-sm sm:text-lg">{exercise?.name}</p>
            <FaTimes
              size={22}
              className="cursor-pointer rounded-full p-1.5 hover:bg-gray-200 h-[30px] w-[30px]"
              onClick={() => close()}
            />
          </div>
          <div className="flex items-center justify-center">
            <video loop controls width={600} height={300}>
              <source src={exercise?.videoUrl} type="video/mp4" />
            </video>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 items-center justify-evenly gap-3">
            <div className="rounded-lg  bg-gray-100 p-6 w-full h-full text-center text-sm">
              <p className="text-gray-500">Body Part</p>
              {exercise?.bodyParts?.map((bp) => (
                <p key={bp}>{bp.toLowerCase()}</p>
              ))}
            </div>
            <div className="rounded-lg  bg-gray-100 p-6 w-full h-full text-center text-sm">
              <p className="text-gray-500">Exercise type</p>
              {exercise?.exerciseType.toLowerCase()}
            </div>
            <div className="rounded-lg  bg-gray-100 p-6 w-full h-full text-center text-sm">
              <p className="text-gray-500">Equipment</p>
              {exercise?.equipments?.map((e) => (
                <p key={e}>{e.toLowerCase()}</p>
              ))}
            </div>
            {exercise?.targetMuscles?.length > 0 && (
              <div className="rounded-lg  bg-gray-100 p-6 w-full text-center text-sm">
                <p className="text-gray-500">Target</p>
                {exercise?.targetMuscles?.map((s) => (
                  <p key={s}>{s.toLowerCase()}</p>
                ))}
              </div>
            )}
          </div>
          <p className="text-lg">Instructions</p>
          <ol className="list-decimal">
            {exercise?.instructions?.map((i) => (
              <li key={i} className="text-sm ml-4">
                {i}
              </li>
            ))}
          </ol>

          <div className="bg-secondary-blue rounded-lg p-4">
            <p className="text-lg text-main-blue">Pro tips</p>
            {exercise?.exerciseTips?.map((t) => (
              <p key={t} className="text-sm text-main-blue indent-[12px]">
                {t}
              </p>
            ))}
          </div>

          {exercise?.variations?.length > 0 && (
            <div className="bg-secondary-green rounded-lg p-4">
              <p className="text-lg text-main-green">Pro tips</p>
              {exercise?.variations?.map((t) => (
                <p key={t} className="text-sm text-main-green indent-[12px]">
                  {t}
                </p>
              ))}
            </div>
          )}
        </div>
      )}
    </Dialog>
  );
}

export default ExerciseDialogInfo;
