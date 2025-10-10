import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";
import Dropdown from "../../../../components/ui/dropdowns/Dropdown";
import FormInput from "../../../../components/ui/inputs/FormInput";
import type {
  IExercise,
  IExerciseCreate,
  IMeta,
  IRequestParams,
} from "../../../../interfaces/IExercise";
import Tooltip from "../../../../components/ui/Tooltip";
import { RiResetLeftFill } from "react-icons/ri";
import { useCallback, useEffect, useState } from "react";
import { useAppSelector } from "../../../../hooks/useTypedStore";
import Pagination from "../../../../components/Pagination";
import { FaTimes } from "react-icons/fa";
import { ClipLoader } from "react-spinners";
import Dialog from "../../../../components/ui/dialogs/Dialog";
import axios from "../../../../axios/AxiosConfig";
import Button from "../../../../components/ui/buttons/Button";
import type { IExerciseCreateSave } from "../../../../interfaces/IWorkouts";
import toast from "react-hot-toast";

function SearchExerciseCreate({
  addExercise,
}: {
  addExercise: (exercise: IExerciseCreateSave) => void;
}) {
  const methods = useForm<IExerciseCreate>({
    defaultValues: {
      filter: "",
      equipment: "",
      bodyPart: "",
      target: "",
      type: "",
      sets: 0,
      reps: 0,
      duration: 0,
    },
  });

  const {
    handleSubmit,
    register,
    watch,
    reset,
    setError,
    clearErrors,
    formState: { errors },
  } = methods;

  const reps = watch("reps");
  const sets = watch("sets");
  const duration = watch("duration");

  const equipment = watch("equipment");
  const bodyPart = watch("bodyPart");
  const filter = watch("filter");
  const type = watch("type");

  const [exercises, setExercises] = useState<IExercise[]>([]);
  const [meta, setMeta] = useState<IMeta>();
  const [loading, setLoading] = useState<boolean>(false);
  const [exerciseLoading, setExerciseLoading] = useState<boolean>(false);
  const [currentExercise, setCurrentExercise] = useState<IExercise | null>(
    null
  );
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [error, setErr] = useState<string>("");
  const utils = useAppSelector((state) => state.exercisesUtils);
  const [perPage, setPerPage] = useState<number>(5);

  const resetFilters = () => {
    reset({
      filter: "",
      equipment: "",
      bodyPart: "",
      target: "",
      type: "",
    });
    setExercises([]);
    setMeta(undefined);
    setPerPage(5);
  };

  const getExerciseById = async (id: string) => {
    setExerciseLoading(true);

    const options = {
      method: "GET",
      url: `${import.meta.env.VITE_RAPID_URL}/exercises/${id}`,
      headers: {
        "X-RapidAPI-Key": import.meta.env.VITE_RAPID_KEY,
        "X-RapidAPI-Host": import.meta.env.VITE_RAPID_HOST,
      },
    };

    await axios
      .request(options)
      .then((data) => {
        setCurrentExercise(data.data.data);
      })
      .catch((err) => {
        if (err.response?.data?.error) {
          setErr(
            err.response?.data?.error || "Error fetching data. Try again!"
          );
        }
      })
      .finally(() => {
        setExerciseLoading(false);
      });
  };

  const getExercises = useCallback(
    (params: IRequestParams) => {
      setLoading(true);

      const options = {
        method: "GET",
        url: `${import.meta.env.VITE_RAPID_URL}/exercises`,
        headers: {
          "X-RapidAPI-Key": import.meta.env.VITE_RAPID_KEY,
          "X-RapidAPI-Host": import.meta.env.VITE_RAPID_HOST,
        },
        params: {
          name: filter,
          exerciseType: type,
          bodyParts: bodyPart,
          equipments: equipment,
          limit: perPage,
          after: params.after ?? "",
          before: params.before ?? "",
        },
      };

      axios
        .request(options)
        .then((data) => {
          setExercises(data.data.data);
          setMeta(data.data.meta);
        })
        .catch((err) => {
          if (err.response?.data?.error) {
            setErr(
              err.response?.data?.error || "Error fetching data. Try again!"
            );
          }
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [filter, type, bodyPart, equipment, perPage]
  );

  useEffect(() => {
    // return;

    const delay = setTimeout(() => {
      if (!filter && !type && !bodyPart && !equipment) {
        return;
      }

      getExercises({
        limit: perPage,
      });
    }, 750);

    return () => clearTimeout(delay);
  }, [filter, type, bodyPart, equipment, getExercises, perPage]);

  const onSubmit: SubmitHandler<IExerciseCreate> = () => {
    console.log("in on submit exercise");

    if (!currentExercise) {
      toast.error("Exercise not selected");
      return;
    }

    console.log("not empty exercise");

    if (!((reps ?? 0) > 0 && (sets ?? 0) > 0) && !((duration ?? 0) > 0)) {
      setError("sets", {
        message: "Sets/Reps or Duration is needed.",
      });
      setError("reps", {
        message: "Sets/Reps or Duration is needed.",
      });
      setError("duration", {
        message: "Sets/Reps or Duration is needed.",
      });
      return;
    }

    console.log(currentExercise);

    addExercise({
      ...currentExercise,
      reps: reps,
      sets: sets,
      duration: duration,
    });

    clearErrors();
    setOpenDialog(false);
    reset();
  };

  return (
    <>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <FormProvider {...methods}>
        <div className="mt-4 rounded-xl shadow-md bg-white flex flex-col lg:flex-row items-center p-4 gap-3">
          <div className="w-full">
            <FormInput
              id="filter"
              name="Search exercises..."
              register={register}
              hideDetails
            />
          </div>

          <div className="w-full">
            <Dropdown
              id="type"
              name="Exercise Type"
              // register={register}
              values={[
                ...(utils?.types?.map((t) => {
                  return {
                    name: t,
                    value: t,
                  };
                }) || []),
              ]}
            />
          </div>

          <div className="w-full">
            <Dropdown
              id="bodyPart"
              name="Body Part"
              // register={register}
              values={[
                ...(utils?.bodyParts?.map((t) => {
                  return {
                    name: t,
                    value: t,
                  };
                }) || []),
              ]}
            />
          </div>

          <div className="w-full">
            <Dropdown
              id="equipment"
              name="Equipment"
              // register={register}
              values={[
                ...(utils?.equipment?.map((t) => {
                  return {
                    name: t,
                    value: t,
                  };
                }) || []),
              ]}
            />
          </div>

          <div className="relative " onClick={resetFilters}>
            <Tooltip
              text="Reset"
              styles="mb-3.5 !-translate-x-7.5 !translate-y-1"
              show={true}
            >
              <div className=" cursor-pointer rounded-full p-2 hover:bg-gray-200">
                <RiResetLeftFill size={22} />
              </div>
            </Tooltip>
          </div>
        </div>

        {/* {children} */}

        {loading ? (
          <div className="flex flex-row items-center justify-center mt-12">
            <ClipLoader color="var(--main-blue)" size={54} />
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-1 mt-6 ml-2 overflow-y-auto max-h-[350px]">
              {exercises.length > 0 &&
                exercises.map((ex) => (
                  <div
                    key={ex.exerciseId}
                    className="cursor-pointer hover:underline text-main-blue transition-all duration-150"
                    onClick={() => {
                      getExerciseById(ex.exerciseId);
                      setOpenDialog(true);
                    }}
                  >
                    <p>{ex.name}</p>
                  </div>
                ))}
            </div>

            {(meta?.hasNextPage || meta?.hasPreviousPage) && (
              <div className="mt-8 px-4">
                <Pagination
                  meta={meta}
                  changePage={(params: IRequestParams) => getExercises(params)}
                  perPage={perPage}
                  setPerPage={setPerPage}
                />
              </div>
            )}
          </>
        )}
      </FormProvider>

      <Dialog
        showModal={openDialog}
        styles="sm:!min-w-3xl !overflow-y-auto no-scrollbar"
      >
        {exerciseLoading || !currentExercise ? (
          <div className="flex flex-row items-center justify-center">
            <ClipLoader color="var(--main-blue)" size={26} />
          </div>
        ) : (
          <div className="flex flex-col gap-4 ">
            <div className="flex flex-row items-center justify-between ">
              <p className="text-sm sm:text-lg">{currentExercise?.name}</p>
              <FaTimes
                size={22}
                className="cursor-pointer rounded-full p-1.5 hover:bg-gray-200 h-[30px] w-[30px]"
                onClick={() => setOpenDialog(false)}
              />
            </div>
            <div className="flex items-center justify-center">
              <video loop controls width={600} height={300}>
                <source src={currentExercise?.videoUrl} type="video/mp4" />
              </video>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 items-center justify-evenly gap-3">
              <div className="rounded-lg  bg-gray-100 p-6 w-full h-full text-center text-sm">
                <p className="text-gray-500">Body Part</p>
                {currentExercise?.bodyParts?.map((bp) => (
                  <p key={bp}>{bp.toLowerCase()}</p>
                ))}
              </div>
              <div className="rounded-lg  bg-gray-100 p-6 w-full h-full text-center text-sm">
                <p className="text-gray-500">Exercise type</p>
                {currentExercise?.exerciseType.toLowerCase()}
              </div>
              <div className="rounded-lg  bg-gray-100 p-6 w-full h-full text-center text-sm">
                <p className="text-gray-500">Equipment</p>
                {currentExercise?.equipments?.map((e) => (
                  <p key={e}>{e.toLowerCase()}</p>
                ))}
              </div>
              {currentExercise?.targetMuscles?.length > 0 && (
                <div className="rounded-lg  bg-gray-100 p-6 w-full text-center text-sm">
                  <p className="text-gray-500">Target</p>
                  {currentExercise?.targetMuscles?.map((s) => (
                    <p key={s}>{s.toLowerCase()}</p>
                  ))}
                </div>
              )}
            </div>
            <p className="text-lg">Instructions</p>
            <ol className="list-decimal">
              {currentExercise?.instructions?.map((i) => (
                <li key={i} className="text-sm ml-4">
                  {i}
                </li>
              ))}
            </ol>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-2"
            >
              <p className="text-lg">How long</p>

              <div className="flex flex-col items-center">
                <div className="flex flex-row items-center gap-4 w-full">
                  <FormInput
                    id="sets"
                    name="Sets"
                    register={register}
                    errors={errors}
                    type="number"
                  />

                  <FormInput
                    id="reps"
                    name="Reps"
                    register={register}
                    type="number"
                    errors={errors}
                  />
                </div>
                <p className="mb-2 -mt-2">or</p>
                <FormInput
                  id="duration"
                  name="Duration (min)"
                  register={register}
                  errors={errors}
                  type="number"
                />
              </div>

              <div className="flex flex-row items-center justify-end gap-3">
                <Button
                  type="button"
                  size="medium"
                  color="danger"
                  handleClick={() => {
                    setOpenDialog(false);
                    reset();
                    clearErrors();
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit" size="medium" color="success">
                  Add
                </Button>
              </div>
            </form>
          </div>
        )}
      </Dialog>
    </>
  );
}

export default SearchExerciseCreate;
