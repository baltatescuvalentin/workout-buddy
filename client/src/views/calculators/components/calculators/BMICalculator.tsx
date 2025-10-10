import { FaWeightScale } from "react-icons/fa6";
import Calculator from "../../../../components/calculators/Calculator";
import FormInput from "../../../../components/ui/inputs/FormInput";
import type { IBMICalculator } from "../../../../interfaces/ICalculator";
import { useForm, type SubmitHandler } from "react-hook-form";
import Button from "../../../../components/ui/buttons/Button";
import { calculateBMI } from "../../../../utils/calculators";
import { useState } from "react";
import { useAppSelector } from "../../../../hooks/useTypedStore";

type BMIType = {
  bmi: number;
  status: string;
};

function BMICalculator() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<IBMICalculator>({
    defaultValues: {
      weight: 0,
      height: 0,
    },
  });

  const [bmi, setBMI] = useState<BMIType>({
    bmi: 0,
    status: "",
  });

  const user = useAppSelector((state) => state.user);

  const calculate: SubmitHandler<IBMICalculator> = (data) => {
    const bmi = calculateBMI(data.weight, data.height);
    setBMI({
      bmi: bmi.bmi,
      status: bmi.status,
    });
  };

  const calculateWithUserValues = () => {
    const bmi = calculateBMI(Number(user.weight), Number(user.height));
    setValue("weight", user.weight);
    setValue("height", user.height);
    setBMI({
      bmi: bmi.bmi,
      status: bmi.status,
    });
  };

  return (
    <Calculator submit={handleSubmit(calculate)}>
      <Calculator.Header>
        <div className="rounded-full bg-secondary-blue h-fit w-fit p-4">
          <FaWeightScale size={24} color="var(--main-blue)" />
        </div>
        <div className="flex flex-col">
          <p className="font-semibold text-lg">BMI Calculator</p>
          <p className="text-sm">Body Mass Index</p>
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
              message: "Weight is required",
            },
          }}
        />

        <Button
          type="submit"
          color="primary"
          size="medium"
          styles="col-span-full w-full"
        >
          Calculate BMI
        </Button>

        <p className="text-center col-span-full text-sm">Or</p>

        <Button
          type="button"
          color="secondary"
          size="medium"
          styles="col-span-full w-full"
          handleClick={calculateWithUserValues}
        >
          Use profile values
        </Button>
      </Calculator.Body>
      <Calculator.Footer>
        <p className="text-main-blue text-xl">{bmi.bmi}</p>
        <p>{bmi.status}</p>
      </Calculator.Footer>
    </Calculator>
  );
}

export default BMICalculator;
