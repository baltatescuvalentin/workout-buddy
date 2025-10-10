import { FaChartPie } from "react-icons/fa";
import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";
import Calculator from "../../../../components/calculators/Calculator";
import Button from "../../../../components/ui/buttons/Button";
import FormInput from "../../../../components/ui/inputs/FormInput";
import type {
  IMacroCalculator,
  Macros,
} from "../../../../interfaces/ICalculator";
import { calculateMacros } from "../../../../utils/calculators";
import { useState } from "react";
import Dropdown from "../../../../components/ui/dropdowns/Dropdown";

function MacrosCalculator() {
  const [macros, setMacros] = useState<Macros>();

  const methods = useForm<IMacroCalculator>({
    defaultValues: {
      weight: 0,
      calories: 0,
      goal: "maintain",
    },
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = methods;

  const calculate: SubmitHandler<IMacroCalculator> = (data) => {
    const cMacros = calculateMacros(data.weight, data.calories, data.goal);
    setMacros(cMacros);
  };

  return (
    <Calculator submit={handleSubmit(calculate)}>
      <Calculator.Header>
        <div className="rounded-full bg-secondary-orange h-fit w-fit p-4">
          <FaChartPie size={24} color="var(--main-orange)" />
        </div>
        <div className="flex flex-col">
          <p className="font-semibold text-lg">Macro Calculator</p>
          <p className="text-sm">Macronutrient Distribution</p>
        </div>
      </Calculator.Header>
      <Calculator.Body>
        <FormProvider {...methods}>
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
            id="calories"
            name="Calories"
            register={register}
            errors={errors}
            validation={{
              min: {
                value: 10,
                message: "Calories is required",
              },
            }}
          />

          <Dropdown
            styles="col-span-full w-full"
            id="goal"
            name="Goal"
            // register={register}
            errors={errors}
            values={[
              {
                name: "Weight Loss",
                value: "loss",
              },
              {
                name: "Maintain Weight",
                value: "maintain",
              },
              {
                name: "Muscle Gain",
                value: "gain",
              },
            ]}
            validation={{
              required: "Goal is required",
            }}
          />

          <Button
            type="submit"
            color="primary"
            size="medium"
            styles="col-span-full w-full"
          >
            Calculate Macros
          </Button>

          {/* <p className="text-center col-span-full text-sm">Or</p>

        <Button
          type="button"
          color="secondary"
          size="medium"
          styles="col-span-full w-full"
          handleClick={calculateWithUserValues}
        >
          User profile values
        </Button> */}
        </FormProvider>
      </Calculator.Body>
      <Calculator.Footer>
        <div className="p-3 w-full">
          <div className="flex flex-row w-full justify-between items-center gap-2">
            <p className="text-sm">Protein</p>
            <p className="text-sm">{macros?.protein ?? "0"} grams</p>
          </div>
          <div className="flex flex-row w-full justify-between items-center gap-2">
            <p className="text-sm">Fat</p>
            <p className="text-sm">{macros?.fat ?? "0"} grams</p>
          </div>
          <div className="flex flex-row w-full justify-between items-center gap-2">
            <p className="text-sm">Carbs</p>
            <p className="text-sm">{macros?.carbs ?? "0"} grams</p>
          </div>
        </div>
      </Calculator.Footer>
    </Calculator>
  );
}

export default MacrosCalculator;
