import { useForm } from "react-hook-form";
import axios from "../../axios/AxiosConfig";
import { useCallback, useEffect, useState } from "react";
import {
  type IMeta,
  type IExercise,
  type IExerciseFilter,
  type IExerciseUtils,
  type IRequestParams,
} from "../../interfaces/IExercise";
import FormInput from "../../components/ui/inputs/FormInput";
import Dropdown from "../../components/ui/dropdowns/Dropdown";
import { useAppDispatch, useAppSelector } from "../../hooks/useTypedStore";
import { setExerciseUtils } from "../../stores/User";
import Dialog from "../../components/ui/dialogs/Dialog";
import { RiResetLeftFill } from "react-icons/ri";
import Tooltip from "../../components/ui/Tooltip";
import { FaTimes } from "react-icons/fa";
import Pagination from "../../components/Pagination";
import { ClipLoader } from "react-spinners";

function Exercices() {
  const [loading, setLoading] = useState<boolean>(false);
  const [exerciseLoading, setExerciseLoading] = useState<boolean>(false);
  const [utils, setUtils] = useState<IExerciseUtils>();
  const [exercises, setExercises] = useState<IExercise[]>([]);
  const [meta, setMeta] = useState<IMeta>();
  const [perPage, setPerPage] = useState<number>(5);
  const [currentExercise, setCurrentExercise] = useState<IExercise | null>(
    null
  );
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const exerciseUtils = useAppSelector((state) => state.exercisesUtils);
  const dispatch = useAppDispatch();

  const { register, watch, setValue } = useForm<IExerciseFilter>({
    defaultValues: {
      filter: "",
      equipment: "",
      bodyPart: "",
      target: "",
      type: "",
    },
  });

  // const target = watch("target");
  const equipment = watch("equipment");
  const bodyPart = watch("bodyPart");
  const filter = watch("filter");
  const type = watch("type");

  const resetFilters = () => {
    setValue("bodyPart", "");
    setValue("equipment", "");
    setValue("filter", "");
    setValue("target", "");
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
        console.log(data.data);
        setCurrentExercise(data.data.data);
      })
      .catch((e) => {})
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
          console.log(data.data);
          setExercises(data.data.data);
          setMeta(data.data.meta);
        })
        .catch((e) => {})
        .finally(() => {
          setLoading(false);
        });
    },
    [filter, type, bodyPart, equipment, perPage]
  );

  useEffect(() => {
    axios
      .get("/exercises/getExerciseUtils")
      .then((data) => {
        console.log(data.data.data);
        setUtils(data.data.data);

        if (
          exerciseUtils?.bodyParts.length === 0 ||
          exerciseUtils?.equipment.length === 0 ||
          exerciseUtils?.target.length === 0 ||
          exerciseUtils?.types.length === 0
        ) {
          dispatch(setExerciseUtils(data.data.data));
        }
      })
      .catch((e) => {});
  }, [dispatch, exerciseUtils]);

  // paginare + loading animations
  useEffect(() => {
    // return;

    const delay = setTimeout(() => {
      getExercises({
        limit: perPage,
      });

      // const options = {
      //   method: "GET",
      //   url: `${import.meta.env.VITE_RAPID_URL}/exercises`,
      //   headers: {
      //     "X-RapidAPI-Key": import.meta.env.VITE_RAPID_KEY,
      //     "X-RapidAPI-Host": import.meta.env.VITE_RAPID_HOST,
      //   },
      //   params: {
      //     name: filter,
      //     exerciseType: type,
      //     bodyParts: bodyPart,
      //     equipments: equipment,
      //     limit: "",
      //   },
      // };

      // axios
      //   .request(options)
      //   .then((data) => {
      //     console.log(data.data.data);
      //     setExercises(data.data.data);
      //     setMeta(data.data.meta);
      //   })
      //   .catch((e) => {})
      //   .finally(() => {});

      // axios
      //   .get("/exercises/getExerciseFilter", {
      //     params: {
      //       target,
      //       equipment,
      //       bodyPart,
      //       filter,
      //     },
      //   })
      //   .then((data) => {
      //     console.log(data);
      //     setExercises(data.data.data);
      //   })
      //   .catch((e) => {})
      //   .finally(() => {});
    }, 750);

    return () => clearTimeout(delay);
  }, [filter, type, bodyPart, equipment, getExercises, perPage]);

  return (
    <>
      <div>
        <p className="text-3xl">Exercise Library</p>
        <p className="text-lg">
          Discover thousands of exercises with detailed instructions
        </p>

        <div className="mt-4 rounded-xl shadow-md bg-white flex flex-col lg:flex-row items-center p-4  gap-3">
          <div className="w-full">
            <FormInput
              id="filter"
              name="Search exercises..."
              register={register}
            />
          </div>

          <div className="w-full">
            <Dropdown
              id="type"
              name="Exercise Type"
              register={register}
              values={[
                ...(utils?.types.map((t) => {
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
              register={register}
              values={[
                ...(utils?.bodyParts.map((t) => {
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
              register={register}
              values={[
                ...(utils?.equipment.map((t) => {
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

        {loading ? (
          <div className="flex flex-row items-center justify-center mt-12">
            <ClipLoader color="var(--main-blue)" size={54} />
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-1 mt-6 ml-2">
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

            {meta?.hasNextPage && (
              <div className="mt-8 px-4">
                <Pagination
                  meta={meta}
                  // perPageChange={(params: IRequestParams) => getExercises(params)}
                  changePage={(params: IRequestParams) => getExercises(params)}
                  perPage={perPage}
                  setPerPage={setPerPage}
                />
              </div>
            )}
          </>
        )}
      </div>

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
              <video loop autoPlay controls width={600} height={300}>
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

            <div className="bg-secondary-blue rounded-lg p-4">
              <p className="text-lg text-main-blue">Pro tips</p>
              {currentExercise?.exerciseTips?.map((t) => (
                <p key={t} className="text-sm text-main-blue indent-[12px]">
                  {t}
                </p>
              ))}
            </div>

            {currentExercise?.variations?.length > 0 && (
              <div className="bg-secondary-green rounded-lg p-4">
                <p className="text-lg text-main-green">Pro tips</p>
                {currentExercise?.variations?.map((t) => (
                  <p key={t} className="text-sm text-main-green indent-[12px]">
                    {t}
                  </p>
                ))}
              </div>
            )}
          </div>
        )}
      </Dialog>
    </>
  );
}

export default Exercices;
