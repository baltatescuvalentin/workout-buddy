import { FormProvider, useForm } from "react-hook-form";
import Dropdown from "./ui/dropdowns/Dropdown";
import FormInput from "./ui/inputs/FormInput";
import type {
  IExercise,
  IExerciseFilter,
  IMeta,
  IRequestParams,
} from "../interfaces/IExercise";
import Tooltip from "./ui/Tooltip";
import { RiResetLeftFill } from "react-icons/ri";
import { useCallback, useEffect, useState } from "react";
import { useAppSelector } from "../hooks/useTypedStore";
import Pagination from "./Pagination";
import { ClipLoader } from "react-spinners";
import axios from "../axios/AxiosConfig";
import ExerciseDialogInfo from "./ui/dialogs/ExerciseDialogInfo";

function SearchExercise() {
  const methods = useForm<IExerciseFilter>({
    defaultValues: {
      filter: "",
      equipment: "",
      bodyPart: "",
      target: "",
      type: "",
    },
  });

  const { register, watch, reset } = methods;

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
  const [error, setError] = useState<string>("");
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
          setError(
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
            setError(
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
                    className="text-main-blue cursor-pointer transition-all duration-150 hover:underline"
                    onClick={() => {
                      getExerciseById(ex.exerciseId);
                      setOpenDialog(true);
                    }}
                  >
                    {ex.name}
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

      <ExerciseDialogInfo
        open={openDialog}
        close={() => setOpenDialog(false)}
        exercise={currentExercise}
        loading={exerciseLoading}
      />
    </>
  );
}

export default SearchExercise;
