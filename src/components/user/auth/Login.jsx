import React from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import axios from "axios";
import GoogleLoginButton from "../../googleAuth/GoogleLoginButton";
import GithubLogin from "../../gitHubAuth/GithubLoginButton";
import { Stack } from "@mui/material";

export const Login = () => {
  const navigate = useNavigate();

  const schema = yup
    .object({
      email: yup
        .string()
        .email("Invalid email format")
        .required("Email is required"),
      password: yup.string().required("Password is required"),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const res = await axios.post(
        "http://localhost:5555/api/v1/signin",
        data,
        {
          withCredentials: true,
        }
      );
      console.log(res.data);
      if (res.data.success) {
        toast.success("Login Success!");
        return navigate("/");
      } else {
        // alert(res.data.message);
        toast.error(`Login Failed! ${res.data.message}`);
        return navigate("/signin");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <section className="">
        <Link to={"/"}>
          <div className="ms-10 mt-10 border border-gray-500 w-[140px] rounded-md flex items-start justify-center">
            <p className="text-gray-600 ">Back to Home</p>
          </div>
        </Link>
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <Link
            to="/"
            className="flex items-center mb-6 text-2xl font-semibold text-indigo-800 dark:text-indigo-800"
          >
            FashionOasis
          </Link>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl darktext-gray-900">
                Welcome Back.
              </h1>
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-900 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    // required
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-900 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    // required
                    {...register("password")}
                  />
                  {errors.password && (
                    <p className="text-sm text-red-500">
                      {errors.password.message}
                    </p>
                  )}
                </div>
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="terms"
                      aria-describedby="terms"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300  dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      required
                      checked
                      disabled
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="terms"
                      className="font-light text-gray-500 dark:text-gray-500"
                    >
                      I accept the
                      <a
                        className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                        href="#"
                      >
                        Terms and Conditions
                      </a>
                    </label>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-indigo-500 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-indigo-500 dark:hover:bg-indigo-700 dark:focus:ring-primary-800"
                >
                  Login
                </button>
                <hr className="w-full h-[2px] border-1 border-gray-500" />

                {/* <div className="">
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    or <span>Login with</span>
                  </p>

                  <Stack spacing={2} width={'100%'} marginTop={"10px"}>
                  <GoogleLoginButton/>
                  <GithubLogin/>
                  </Stack>
                  
                  
                </div> */}

                <p className="text-sm font-light text-gray-500 dark:text-gray-500">
                  Don't have an account yet?
                  <Link
                    to="/register"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Register here
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};


