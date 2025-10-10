import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router";
import type { IWorkout } from "../../interfaces/IWorkouts";
import axios from "../../axios/AxiosConfig";
import { ClipLoader } from "react-spinners";
import Dropdown from "../../components/ui/dropdowns/Dropdown";
import { FormProvider, useForm } from "react-hook-form";
import Chip from "../../components/ui/buttons/Chip";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

function ExerciseIndex() {
  const [workout, setWorkout] = useState<IWorkout>();
  const [workouts, setWorkouts] = useState<IWorkout[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [err, setErr] = useState<string>("");
  const [day, setDay] = useState<string>("");
  const [index, setIndex] = useState<number>(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const methods = useForm({
    defaultValues: {
      workoutId: "",
    },
  });

  const { watch } = methods;
  const workoutId = watch("workoutId");

  const location = useLocation();

  useEffect(() => {
    setLoading(true);

    if (location.state && location.state.id) {
      axios
        .get(`/workoutroutine/getWorkoutById/${location.state.id}`)
        .then((data) => {
          setWorkout(data.data.data);
          setErr("");
        })
        .catch((error) => {
          if (error.response?.data?.error) {
            setErr(error.response.data.error);
          } else {
            setErr("Error retrieving the workouts, try again later!");
          }
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      axios
        .get("/workoutroutine/getWorkouts")
        .then((data) => {
          setWorkouts(data.data.data);
          setErr("");
        })
        .catch((error) => {
          if (error.response?.data?.error) {
            setErr(error.response.data.error);
          } else {
            setErr("Error retrieving the workouts, try again later!");
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [location.state]);

  useEffect(() => {
    if (workoutId) {
      axios
        .get(`/workoutroutine/getWorkoutById/${workoutId}`)
        .then((data) => {
          setWorkout(data.data.data);
          setErr("");
        })
        .catch((error) => {
          if (error.response?.data?.error) {
            setErr(error.response.data.error);
          } else {
            setErr("Error retrieving the workouts, try again later!");
          }
        });
    }
  }, [workoutId]);

  useEffect(() => {
    const newSrc = workout?.days[day]?.exercises[index]?.videoUrl;

    if (videoRef.current && videoRef.current.src !== newSrc) {
      videoRef.current.src = newSrc as string;
      videoRef.current.load();
    }
  }, [day, index, workout]);

  return (
    <>
      {loading ? (
        <ClipLoader color="var(--main-blue)" size={50} />
      ) : (
        <div>
          {err && <p className="text-red-500 text-sm">{err}</p>}
          {(!location.state || !location.state.id) && (
            <div>
              <p className="text-2xl font-bold">Start your workout</p>
              <p className="text-lg mb-2">Select a workout</p>
              <FormProvider {...methods}>
                <Dropdown
                  id="workoutId"
                  name="Workout"
                  values={[
                    ...workouts.map((w) => {
                      return {
                        name: w.name,
                        value: w._id,
                      };
                    }),
                  ]}
                />
              </FormProvider>
            </div>
          )}
          {workout && (
            <div className="mt-4">
              <p className="text-base md:text-lg">{workout.name}</p>
              {workout.description && (
                <p className="text-sm">{workout.description}</p>
              )}

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
                <>
                  <p className="font-bold mt-4">{day.toUpperCase()}</p>
                  {workout.days[day].exercises.length === 0 ? (
                    <p className="text-lg">No exercises for this day 😞</p>
                  ) : (
                    <div className="flex flex-col gap-4 mt-4">
                      <div className="flex flex-col gap-4 ">
                        <p className="text-sm sm:text-lg">
                          {workout.days[day].exercises[index]?.name}
                        </p>
                        <div className="flex items-center justify-center">
                          <video
                            ref={videoRef}
                            loop
                            controls
                            width={600}
                            height={300}
                          >
                            <source type="video/mp4" />
                          </video>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 items-center justify-evenly gap-3">
                          <div className="rounded-lg  bg-gray-100 p-6 w-full h-full text-center text-sm">
                            <p className="text-gray-500">Body Part</p>
                            {workout.days[day].exercises[index]?.bodyParts?.map(
                              (bp) => (
                                <p key={bp}>{bp.toLowerCase()}</p>
                              )
                            )}
                          </div>
                          <div className="rounded-lg  bg-gray-100 p-6 w-full h-full text-center text-sm">
                            <p className="text-gray-500">Exercise type</p>
                            {workout.days[day].exercises[
                              index
                            ]?.exerciseType.toLowerCase()}
                          </div>
                          <div className="rounded-lg  bg-gray-100 p-6 w-full h-full text-center text-sm">
                            <p className="text-gray-500">Equipment</p>
                            {workout.days[day].exercises[
                              index
                            ]?.equipments?.map((e) => (
                              <p key={e}>{e.toLowerCase()}</p>
                            ))}
                          </div>
                          {workout.days[day].exercises[index]?.targetMuscles
                            ?.length > 0 && (
                            <div className="rounded-lg  bg-gray-100 p-6 w-full text-center text-sm">
                              <p className="text-gray-500">Target</p>
                              {workout.days[day].exercises[
                                index
                              ].targetMuscles?.map((s) => (
                                <p key={s}>{s.toLowerCase()}</p>
                              ))}
                            </div>
                          )}
                        </div>
                        <p className="text-lg">Instructions</p>
                        <ol className="list-decimal">
                          {workout.days[day].exercises[
                            index
                          ]?.instructions?.map((i) => (
                            <li key={i} className="text-sm ml-4">
                              {i}
                            </li>
                          ))}
                        </ol>

                        <div className="bg-secondary-blue rounded-lg p-4">
                          <p className="text-lg text-main-blue">Pro tips</p>
                          {workout.days[day].exercises[
                            index
                          ]?.exerciseTips?.map((t) => (
                            <p
                              key={t}
                              className="text-sm text-main-blue indent-[12px]"
                            >
                              {t}
                            </p>
                          ))}
                        </div>

                        {workout.days[day].exercises[index]?.variations
                          ?.length > 0 && (
                          <div className="bg-secondary-green rounded-lg p-4">
                            <p className="text-lg text-main-green">Pro tips</p>
                            {workout.days[day].exercises[
                              index
                            ]?.variations?.map((t) => (
                              <p
                                key={t}
                                className="text-sm text-main-green indent-[12px]"
                              >
                                {t}
                              </p>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="flex flex-row items-center justify-between gap-4">
                        <div
                          className={`flex flex-row items-center justify-center gap-1 cursor-pointer rounded-md bg-blue-500 text-white px-2 py-1 w-[100px] ${
                            index - 1 < 0 &&
                            "bg-gray-300 !cursor-default !pointer-events-none"
                          }`}
                          onClick={() => setIndex((prev) => prev - 1)}
                        >
                          <FaArrowLeft />
                          Previous
                        </div>

                        <div
                          className={`flex flex-row items-center justify-center gap-1 cursor-pointer rounded-md bg-blue-500 text-white px-2 py-1 w-[100px] ${
                            index + 1 >= workout.days[day].exercises?.length &&
                            "bg-gray-300 !cursor-default !pointer-events-none"
                          }`}
                          onClick={() => setIndex((prev) => prev + 1)}
                        >
                          Next
                          <FaArrowRight />
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
          <p>{/* { workout?.name } */}</p>
        </div>
      )}
    </>
  );
}

export default ExerciseIndex;
