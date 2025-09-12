import { useForm } from "react-hook-form";
import Dropdown from "./ui/dropdowns/Dropdown";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { useEffect } from "react";
import type { IMeta, IRequestParams } from "../interfaces/IExercise";

interface IPagination {
  perPage: number;
  meta: IMeta;
  changePage: (value: IRequestParams) => void;
  setPerPage: (value: number) => void;
}

function Pagination({ meta, perPage, changePage, setPerPage }: IPagination) {
  const { register, watch } = useForm({
    defaultValues: {
      perPage: perPage,
    },
  });

  const perPageWatch = watch("perPage");

  useEffect(() => {
    setPerPage(perPageWatch);
  }, [perPageWatch, setPerPage]);

  return (
    <div className="flex flex-col sm:flex-row gap-5 justify-between items-center">
      <div className="flex flex-row items-center justify-center gap-1">
        <p>Show</p>
        <Dropdown
          id="perPage"
          name="Per page"
          defaultValue={5}
          register={register}
          size="small"
          values={[
            {
              name: "5",
              value: 5,
            },
            {
              name: "10",
              value: 10,
            },
            {
              name: "25",
              value: 25,
            },
          ]}
          styles="!p-0"
        />
        <p>items.</p>
      </div>

      <div className="flex flex-row items-center justify-between gap-4">
        <div
          className={`flex flex-row items-center justify-center gap-1 cursor-pointer rounded-md bg-blue-500 text-white px-2 py-1 w-[100px] ${
            !meta.hasPreviousPage &&
            "bg-gray-300 !cursor-default !pointer-events-none"
          }`}
          onClick={() =>
            changePage({ limit: perPageWatch, before: meta.previousCursor })
          }
        >
          <FaArrowLeft />
          Previous
        </div>

        <div
          className={`flex flex-row items-center justify-center gap-1 cursor-pointer rounded-md bg-blue-500 text-white px-2 py-1 w-[100px] ${
            !meta.hasNextPage &&
            "bg-gray-300 !cursor-default !pointer-events-none"
          }`}
          onClick={() =>
            changePage({ limit: perPageWatch, after: meta.nextCursor })
          }
        >
          Next
          <FaArrowRight />
        </div>
      </div>
    </div>
  );
}

export default Pagination;
