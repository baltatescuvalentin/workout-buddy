import Chip from "../../../components/ui/buttons/Chip";
import { useState } from "react";
import SearchExerciseCreate from "./components/SearchExerciseCreate";
import { useForm } from "react-hook-form";
import FormInput from "../../../components/ui/inputs/FormInput";
import type {
  IExerciseCreateSave,
  IWorkout,
  IWorkoutFormTitles,
} from "../../../interfaces/IWorkouts";
import Button from "../../../components/ui/buttons/Button";
import ExerciseDialogInfo from "../../../components/ui/dialogs/ExerciseDialogInfo";
import axios from "../../../axios/AxiosConfig";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router";
function WorkoutsCreate() {
  const navigate = useNavigate();
  const [day, setDay] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [err, setErr] = useState<string>("");
  const methods = useForm<IWorkoutFormTitles>({
    defaultValues: {
      title: "",
      monday: "",
      tuesday: "",
      wednesday: "",
      thursday: "",
      friday: "",
      saturday: "",
      sunday: "",
    },
  });

  const [workout, setWorkout] = useState<IWorkout>({
    name: "",
    description: "",
    days: {},
  });

  const [currentExercise, setCurrentExercise] =
    useState<IExerciseCreateSave | null>(null);
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const {
    register,
    watch,
    formState: { errors },
  } = methods;
  const workoutName = watch("title");

  const addExerciseToDay = (exercise: IExerciseCreateSave) => {
    const currDay = workout.days[day] ?? {
      dayName: day,
      name: "",
      exercises: [],
    };

    setWorkout({
      ...workout,
      days: {
        ...workout.days,
        [day]: {
          ...currDay,
          exercises: [...currDay.exercises, exercise],
        },
      },
    });
  };

  const saveWorkout = () => {
    setLoading(true);

    axios
      .post(`/workoutroutine/create`, {
        // userId: user._id,
        name: workoutName,
        description: workout.description,
        days: workout.days,
      })
      .then(() => {
        // switchTab();
        navigate("/workouts/show");
        toast.success("Workout successfully saved!", {
          position: "top-right",
        });
      })
      .catch((error) => {
        if (error.response?.data?.error) {
          setErr(error.response.data.error);
          toast.error(error.response.data.error, {
            position: "top-right",
          });
        } else {
          setErr("Error saving the workout, try again!");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <div>
        <p className="text-2xl font-bold">Create Your Workout</p>
        <p className="text-lg">
          Design a custom workout plan for each day of the week
        </p>
        {err.length > 0 && <p className="text-sm text-red-500">{err}</p>}
        <div className="w-full lg:w-1/2 mt-2">
          <FormInput
            size="medium"
            id="title"
            name="Workout Title"
            register={register}
            errors={errors}
            validation={{
              required: "Title is required",
            }}
          />
        </div>
        <textarea
          className="rounded-lg shadow-xs border border-gray-200 p-2 w-full focus:outline-none focus:border-[var(--main-blue)]"
          name="description"
          rows={3}
          id="description"
          placeholder="Workout description"
          onChange={(e) =>
            setWorkout({
              ...workout,
              description: e.target.value,
            })
          }
        ></textarea>
        <div>
          <div className="flex flex-row flex-wrap items-center gap-3 mt-2">
            <Chip
              color="primary"
              type="button"
              handleClick={() => setDay("monday")}
              size="medium"
              active={day === "monday"}
            >
              Monday
            </Chip>
            <Chip
              color="primary"
              type="button"
              handleClick={() => setDay("tuesday")}
              size="medium"
              active={day === "tuesday"}
            >
              Tuesday
            </Chip>
            <Chip
              color="primary"
              type="button"
              handleClick={() => setDay("wednesday")}
              size="medium"
              active={day === "wednesday"}
            >
              Wednesday
            </Chip>
            <Chip
              color="primary"
              type="button"
              handleClick={() => setDay("thursday")}
              size="medium"
              active={day === "thursday"}
            >
              Thursday
            </Chip>
            <Chip
              color="primary"
              type="button"
              handleClick={() => setDay("friday")}
              size="medium"
              active={day === "friday"}
            >
              Friday
            </Chip>
            <Chip
              color="primary"
              type="button"
              handleClick={() => setDay("saturday")}
              size="medium"
              active={day === "saturday"}
            >
              Saturday
            </Chip>
            <Chip
              color="primary"
              type="button"
              handleClick={() => setDay("sunday")}
              size="medium"
              active={day === "sunday"}
            >
              Sunday
            </Chip>
          </div>

          {day && (
            <div className="mt-4">
              <p className="text-xl font-bold">{day}</p>
              <div className="w-full lg:w-1/4 mt-3">
                <FormInput
                  id={day}
                  name="Day Name"
                  register={register}
                  size="small"
                />
              </div>
              {workout.days[day]?.exercises?.length > 0 && (
                <>
                  <div>
                    <p className="text-lg">Exercises</p>
                    <ol className="list-decimal">
                      {workout.days[day].exercises?.map((i) => (
                        <li
                          key={i.name}
                          className="text-sm ml-4 hover:text-main-blue hover:cursor-pointer"
                          onClick={() => {
                            setOpenDialog(true);
                            setCurrentExercise(i);
                          }}
                        >
                          {i.name}{" "}
                          {i.duration
                            ? `${i.duration} mins`
                            : `${i.sets} x ${i.reps}`}
                        </li>
                      ))}
                    </ol>
                  </div>
                  <hr className="w-full border-gray-200 my-2" />
                </>
              )}
              <div className="-mt-2">
                <SearchExerciseCreate addExercise={addExerciseToDay} />
              </div>
            </div>
          )}

          {(workoutName || Object.keys(workout.days).length > 0) && (
            <div className="flex flex-row items-center justify-end mt-6">
              <Button
                color="primary"
                size="medium"
                styles="!w-[165px]"
                handleClick={saveWorkout}
              >
                {loading ? (
                  <ClipLoader size={18} color="white" />
                ) : (
                  "Save Workout"
                )}
              </Button>
            </div>
          )}
        </div>
      </div>
      <ExerciseDialogInfo
        exercise={currentExercise}
        close={() => setOpenDialog(false)}
        open={openDialog}
        loading={false}
      />
    </>
  );
}

export default WorkoutsCreate;
