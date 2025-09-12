import { useForm, type SubmitHandler } from "react-hook-form";
import Calculator from "../../../../components/calculators/Calculator";
import Button from "../../../../components/ui/buttons/Button";
import FormInput from "../../../../components/ui/inputs/FormInput";
import type { ITDEECalculator } from "../../../../interfaces/ICalculator";
import { FaFireFlameCurved } from "react-icons/fa6";
import { calculateTDEE } from "../../../../utils/calculators";
import { useState } from "react";
import Dropdown from "../../../../components/ui/dropdowns/Dropdown";
import { useAppSelector } from "../../../../hooks/useTypedStore";

function TDEECalculator() {
  const [tdee, setTDEE] = useState<number>(0);
  const user = useAppSelector((state) => state.user);

  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
    getValues,
    reset,
  } = useForm<ITDEECalculator>({
    defaultValues: {
      age: 0,
      sex: "",
      height: 0,
      weight: 0,
      activity: 0,
    },
  });

  const calculate: SubmitHandler<ITDEECalculator> = (data) => {
    const tdee = calculateTDEE(
      data.weight,
      data.height,
      data.age,
      data.activity,
      data.sex
    );
    setTDEE(tdee);
  };

  const calculateWithUserValues = () => {
    if (!getValues("activity")) {
      setError("activity", {
        type: "manual",
        message: "Select activity for user values calculation",
      });

      return;
    }

    const tdee = calculateTDEE(
      Number(user.weight),
      Number(user.height),
      Number(user.age),
      getValues("activity"),
      user.sex as string
    );

    reset();

    setTDEE(tdee);
  };

  return (
    <Calculator submit={handleSubmit(calculate)}>
      <Calculator.Header>
        <div className="rounded-full bg-secondary-green h-fit w-fit p-4">
          <FaFireFlameCurved size={24} color="var(--main-green)" />
        </div>
        <div className="flex flex-col">
          <p className="font-semibold text-lg">TDEE Calculator</p>
          <p className="text-sm">Total Daily Energy Expenditure</p>
        </div>
      </Calculator.Header>
      <Calculator.Body>
        <FormInput
          type="number"
          id="weight"
          name="Weight (kg)"
          register={register}
          errors={errors}
          validation={{
            min: {
              value: 10,
              message: "Weight is required",
            },
          }}
        />

        <FormInput
          type="number"
          id="height"
          name="Height (cm)"
          register={register}
          errors={errors}
          validation={{
            min: {
              value: 10,
              message: "Height is required",
            },
          }}
        />

        <FormInput
          type="number"
          id="age"
          name="Age"
          register={register}
          errors={errors}
          validation={{
            min: {
              value: 1,
              message: "Age is required",
            },
          }}
        />

        <Dropdown
          id="sex"
          name="Sex"
          register={register}
          errors={errors}
          values={[
            {
              name: "Male",
              value: "male",
            },
            {
              name: "Female",
              value: "female",
            },
          ]}
          validation={{
            required: "Sex is required",
          }}
        />

        <Dropdown
          styles="col-span-full w-full"
          id="activity"
          name="Activity Level"
          register={register}
          errors={errors}
          validation={{
            required: "Activity Level is required",
          }}
          values={[
            {
              name: "Sedendary (little/no exercise)",
              value: 1.2,
            },
            {
              name: "Light (1–3 days/week)",
              value: 1.375,
            },
            {
              name: "Moderate (3–5 days/week)",
              value: 1.55,
            },
            {
              name: "Active (6–7 days/week)",
              value: "1.725",
            },
            {
              name: "Very active (hard exercise/physical job)",
              value: 1.9,
            },
          ]}
        />

        <Button
          type="submit"
          color="primary"
          size="medium"
          styles="col-span-full w-full"
        >
          Calculate TDEE
        </Button>

        <p className="text-center col-span-full text-sm">Or</p>

        <Button
          type="button"
          color="secondary"
          size="medium"
          styles="col-span-full w-full"
          handleClick={calculateWithUserValues}
        >
          User profile values
        </Button>
      </Calculator.Body>
      <Calculator.Footer>
        <p className="text-main-blue text-xl">{tdee}</p>
        <p>Calories/day</p>
      </Calculator.Footer>
    </Calculator>
  );
}

export default TDEECalculator;
