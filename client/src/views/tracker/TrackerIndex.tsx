import { FormProvider, useForm } from "react-hook-form";
import Dropdown from "../../components/ui/dropdowns/Dropdown";
import { MONTHS, YEARS } from "../../utils/constants/tracker";
import Card from "../../components/ui/cards/Card";
import DayCell from "./components/DayCell";
import { useEffect, useState } from "react";
function TrackerIndex() {
  const currMonth =
    new Date().getMonth() + 1 >= 10
      ? String(new Date().getMonth() + 1)
      : `0${new Date().getMonth() + 1}`;

  const currMonthName = new Intl.DateTimeFormat("en", { month: "long" }).format(
    new Date()
  );
  const currMonthDayStart = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    1
  ).getDay();
  const currMonthDays = new Date(
    new Date().getFullYear(),
    new Date().getMonth() + 1,
    0
  ).getDate();

  const currDay = String(new Date().getDate());
  const currYear = String(new Date().getFullYear());

  const [monthStart, setMonthStart] = useState<number | string>(
    currMonthDayStart
  );
  const [monthDays, setMonthDays] = useState<number | string>(currMonthDays);

  const methods = useForm({
    defaultValues: {
      year: currYear,
      month: currMonth,
      day: currDay,
    },
  });

  const { watch } = methods;

  const yearWatch = watch("year");
  const monthWatch = watch("month");
  const dayWatch = watch("day");

  useEffect(() => {
    setMonthStart(
      new Date(Number(yearWatch), Number(monthWatch) - 1, 1).getDay()
    );

    setMonthDays(new Date(Number(yearWatch), Number(monthWatch), 0).getDate());
  }, [monthWatch, yearWatch]);

  return (
    <>
      <p className="text-3xl font-bold">Workout Tracker</p>
      <p>Track your daily workouts and monitor your progress</p>
      <div className="flex flex-col md:flex-row justify-between gap-2 md:gap-8 mt-4">
        <div className="w-full flex flex-col gap-2 rounded-md shadow-lg border border-gray-200 bg-white p-2 md:p-6 ">
          <p className="font-bold text-lg sm:text-xl">Workout Calendar</p>
          <FormProvider {...methods}>
            <div className="flex flex-row justify-end items-center gap-3">
              <Dropdown
                defaultValue={currMonth}
                defaultName={currMonthName}
                name="Month"
                id="month"
                values={MONTHS}
                size="small"
                styles="w-1/3 sm:!w-[120px]"
              />

              <Dropdown
                defaultValue={currYear}
                defaultName={currYear}
                name="Year"
                id="year"
                values={YEARS}
                size="small"
                styles="w-1/3 sm:!w-[100px]"
              />
            </div>
          </FormProvider>

          <div className="grid grid-cols-7 gap-x-4 mt-4">
            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
              <div
                key={d}
                className="border-b-2 border-gray-200 text-end text-sm sm:text-base"
              >
                {d}
              </div>
            ))}
            {Array.from({ length: Number(monthStart) }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}
            {Array.from({ length: Number(monthDays) }, (_, i) => {
              const colStart = i === 0 ? `[col-start-${monthStart}]` : "";
              return (
                <DayCell
                  key={i}
                  styles={colStart}
                  active={false}
                  id="tetst"
                  day={i + 1}
                  handleClick={() => {
                    console.log(i + 1);
                  }}
                />
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <Card styles="!w-full sm:!w-[325px]">test</Card>

          <Card styles="!w-full sm:!w-[325px]">test2</Card>
        </div>
      </div>
    </>
  );
}

export default TrackerIndex;
