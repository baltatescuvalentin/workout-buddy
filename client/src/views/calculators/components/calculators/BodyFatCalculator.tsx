import { FaPercent } from "react-icons/fa";
import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";
import Calculator from "../../../../components/calculators/Calculator";
import Button from "../../../../components/ui/buttons/Button";
import FormInput from "../../../../components/ui/inputs/FormInput";
import type { IBodyFatCalculator } from "../../../../interfaces/ICalculator";
import { calculateBodyFat } from "../../../../utils/calculators";
import { useState } from "react";
import Dropdown from "../../../../components/ui/dropdowns/Dropdown";
// import { useAppSelector } from "../../../../hooks/useTypedStore";

function BodyFatCalculator() {
  const [tdee, setTDEE] = useState<number>(0);
  // const user = useAppSelector((state) => state.user);

  const methods = useForm<IBodyFatCalculator>({
    defaultValues: {
      sex: "",
      height: 0,
      waist: 0,
      neck: 0,
      hip: 0,
    },
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    // setError,
    // getValues,
    // reset,
  } = methods;

  const calculate: SubmitHandler<IBodyFatCalculator> = (data) => {
    const tdee = calculateBodyFat(
      data.height,
      data.waist,
      data.neck,
      Number(data.hip),
      data.sex
    );
    setTDEE(tdee);
  };

  return (
    <Calculator submit={handleSubmit(calculate)}>
      <Calculator.Header>
        <div className="rounded-full bg-secondary-purple h-fit w-fit p-4">
          <FaPercent size={24} color="var(--main-purple)" />
        </div>
        <div className="flex flex-col">
          <p className="font-semibold text-lg">Body Fat Calculator</p>
          <p className="text-sm">Body Fat Percentage</p>
        </div>
      </Calculator.Header>
      <Calculator.Body>
        <FormProvider {...methods}>
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
            id="waist"
            name="Waist (cm)"
            register={register}
            errors={errors}
            validation={{
              min: {
                value: 1,
                message: "Waist is required",
              },
            }}
          />

          <FormInput
            type="number"
            id="neck"
            name="Neck (cm)"
            register={register}
            errors={errors}
            validation={{
              min: {
                value: 1,
                message: "Neck is required",
              },
            }}
          />

          <FormInput
            type="number"
            id="hip"
            name="Hip (cm)"
            register={register}
            info="For women only"
          />

          <Dropdown
            styles="col-span-full w-full"
            id="sex"
            name="Sex"
            // register={register}
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

          <Button
            type="submit"
            color="primary"
            size="medium"
            styles="col-span-full w-full"
          >
            Calculate Body Fat
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
        <p className="text-main-blue text-xl">{tdee} %</p>
        <p>Body Fat</p>
      </Calculator.Footer>
    </Calculator>
  );
}

export default BodyFatCalculator;
