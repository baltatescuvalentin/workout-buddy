import { useForm, type SubmitHandler } from "react-hook-form";
import type { ILoginForm } from "../../interfaces/IAuth";
import { FaDumbbell } from "react-icons/fa6";
import FormInput from "../../components/ui/inputs/FormInput";
import axios from "../../axios/AxiosConfig";
import { useState } from "react";
import { ClipLoader } from "react-spinners";
import toast from "react-hot-toast";
import useUser from "../../hooks/useUser";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginForm>({
    defaultValues: {
      userName: "",
      password: "",
    },
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const { loginUser } = useUser();

  const onSubmit: SubmitHandler<ILoginForm> = (data) => {
    console.log(data);

    setLoading(true);
    axios
      .post(`/auth/login`, data)
      .then((data) => {
        console.log(data);
        loginUser(data.data.user, data.data.token);
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

        <p className="text-xl">Log in</p>

        {error.length > 0 && <p className="text-red-500">{error}</p>}

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

        <p className="text-sm">
          Do not have an account?{" "}
          <a href="/register" className="text-main-blue">
            Sign up
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

export default Login;
