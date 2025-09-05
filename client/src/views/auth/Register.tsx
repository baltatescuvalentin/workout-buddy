import { FaDumbbell } from "react-icons/fa6";
import FormInput from "../../components/ui/inputs/FormInput";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { IRegisterForm } from "../../interfaces/IAuth";
import Dropdown from "../../components/ui/dropdowns/Dropdown";
import { ClipLoader } from "react-spinners";
import { useState } from "react";
import axios from "../../axios/AxiosConfig";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

function Register() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IRegisterForm>({
    defaultValues: {
      fullName: "",
      userName: "",
      email: "",
      password: "",
      confirm_password: "",
      age: 0,
      height: 0,
      weight: 0,
      sex: "",
    },
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const onSubmit: SubmitHandler<IRegisterForm> = (data) => {
    setLoading(true);
    axios
      .post(`/auth/register`, data)
      .then(() => {
        navigate("/login");
        toast.success("Account created successfully.");
      })
      .catch((error) => {
        if (error.response.data.message) {
          setError(error.response.data.message);
        } else {
          setError("This email is already used!");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="shadow-none sm:shadow-lg border-0 sm:border-1 border-gray-100 rounded-lg">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-3 px-4 sm:px-8 py-4"
      >
        <div className="flex flex-row items-center justify-center gap-2 mb-4">
          <FaDumbbell color="var(--main-blue)" size={36} />
          <p className="italic text-2xl text-main-blue">Workout Buddy</p>
        </div>

        <p className="text-xl">Sign up</p>

        {error.length > 0 && <p className="text-red-500">{error}</p>}

        <div className="flex flex-col sm:flex-row gap-3 items-center">
          <FormInput
            name="Fullname"
            id="fullName"
            errors={errors}
            register={register}
            validation={{
              required: "Fullname is required",
            }}
          ></FormInput>

          <FormInput
            name="Username"
            id="userName"
            errors={errors}
            register={register}
            validation={{
              required: "Username is required",
              minLength: {
                value: 8,
                message: "Username should be at least 8 characters",
              },
            }}
          ></FormInput>
        </div>

        <FormInput
          name="Email"
          id="email"
          type="email"
          errors={errors}
          register={register}
          validation={{
            required: "Email is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Entered value does not match email format",
            },
          }}
        ></FormInput>

        <div className="flex flex-col sm:flex-row gap-3 items-center">
          <FormInput
            name="Password"
            id="password"
            type="password"
            errors={errors}
            register={register}
            validation={{
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password should be atleast 8 characters",
              },
            }}
          ></FormInput>

          <FormInput
            name="Confirm password"
            id="confirm_password"
            type="password"
            errors={errors}
            register={register}
            validation={{
              required: "Password is required",
              validate: (val) => {
                if (watch("password") != val) {
                  return "Your passwords do not match";
                }
              },
            }}
          ></FormInput>
        </div>

        <p className="text-sm">Additional information</p>

        <div className="flex flex-col sm:flex-row gap-3 items-center">
          <FormInput
            name="Age"
            id="age"
            type="number"
            errors={errors}
            register={register}
            validation={{
              min: {
                value: 1,
                message: "Age is required",
              },
            }}
          ></FormInput>

          <Dropdown
            name="Sex"
            id="sex"
            register={register}
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
            errors={errors}
            validation={{
              required: "Sex is required",
            }}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-3 items-center">
          <FormInput
            name="Height (cm)"
            id="height"
            type="number"
            errors={errors}
            register={register}
            validation={{
              min: {
                value: 1,
                message: "Height is required",
              },
            }}
          ></FormInput>

          <FormInput
            name="Weight (kg)"
            id="weight"
            type="number"
            errors={errors}
            register={register}
            validation={{
              min: {
                value: 1,
                message: "Weight is required",
              },
            }}
          ></FormInput>
        </div>

        <p className="text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-main-blue">
            Log in
          </a>
        </p>

        <hr className="border-gray-200" />

        <button
          disabled={loading}
          className={`flex items-center justify-center p-2 leading-4 cursor-pointer rounded-sm bg-green-400 text-white text-lg hover:bg-green-300 transition-all duration-200`}
        >
          {loading ? <ClipLoader size={16} color="white" /> : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default Register;
