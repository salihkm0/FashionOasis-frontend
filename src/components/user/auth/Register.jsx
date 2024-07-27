import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
// import { useRecoilState } from "recoil";
import { toast } from "react-hot-toast";

export const Register = () => {
  const navigate = useNavigate();

   const schema = yup
    .object({
      firstName: yup.string().required(),
      lastName: yup.string().required(),
      email: yup.string().email().required(),
      password: yup.string().min(6),
    })
    .required();

  // const passwordRegEx =
  //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  // const schema = yup
  //   .object({
  //     name: yup.string().required("Name is required"),
  //     email: yup
  //       .string()
  //       .email("Invalid email format")
  //       .required("Email is required"),
  //     emptyPass: yup.string().required("Password is required"),
  //     password: yup
  //       .string()
  //       .matches(/[a-z]/, "A lowercase letter")
  //       .matches(/[A-Z]/, "A capital (uppercase) letter")
  //       .matches(/\d/, "A number")
  //       .matches(passwordRegEx, "Minimum 8 characters")
  //       .required("Password is required"),
  //     confirmPassword: yup
  //       .string()
  //       .oneOf([yup.ref("password"), null], "Passwords must match")
  //       .required("Confirm password is required"),
  //   })
  //   .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  // const [passwordLength, setPasswordLength] = useState(0);
  // const [passwordCriteria, setPasswordCriteria] = useState({
  //   lowercase: false,
  //   uppercase: false,
  //   number: false,
  //   length: false,
  // });

  // const handlePasswordChange = (value) => {
  //   setPasswordLength(value.length);
  //   setPasswordCriteria({
  //     lowercase: /[a-z]/.test(value),
  //     uppercase: /[A-Z]/.test(value),
  //     number: /\d/.test(value),
  //     length: value.length >= 8,
  //   });
  // };

  const onSubmit = async (data) => {
    console.log(data);
    // try {
    //   const res = await axios.post(
    //     "http://localhost:5555/api/v1/register",
    //     data,
    //     {
    //       withCredentials: true,
    //     }
    //   );
    //   console.log(res.data);
    //   if (res.data.success) {
    //     toast.success("Successfully Registred");
    //     return navigate("/");
    //   } else {
    //     // alert(res.data.message);
    //     toast.error(`Registration Failed! ${res.data.message}`);
    //     return navigate("/signup");
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  };

  return (
    <>
      <section className="">
        <Link to={"/"}>
          <div className="ms-10 mt-10 border border-gray-500 w-[140px] rounded-md flex items-center justify-center">
            <p className="text-gray-600 ">Back to Home</p>
          </div>
        </Link>
        <div className="mt-10 flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <Link
            to="/"
            className="flex items-center mb-6 text-2xl font-semibold text-indigo-800 dark:text-indigo-800"
          >
            FashionOasis
          </Link>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl darktext-gray-900">
                Create an account
              </h1>
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-900 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Jhone"
                    // required
                    {...register("name")}
                  />
                  {errors.name && (
                    <p className="text-red-500">{errors.name.message}</p>
                  )}
                </div>
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
                    <p className="text-red-500">{errors.email.message}</p>
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
                    // onChange={(e) => {
                    //   handlePasswordChange(e.target.value);
                    // }}
                  />
                  {/* {passwordLength > 0 ? (
                     <div className="mt-1 rounded-lg">
                       <h3 className="text-md font-medium text-gray-800">
                         Password must contain the following:
                       </h3>
                       <ul className="mt-2 space-y-2">
                         <li
                           className={`flex items-center ${
                             passwordCriteria.lowercase
                               ? "text-green-500"
                               : "text-red-500"
                           }`}
                         >
                           {passwordCriteria.lowercase ? "✔" : "✘"} A lowercase
                           letter
                         </li>
                         <li
                           className={`flex items-center ${
                             passwordCriteria.uppercase
                               ? "text-green-500"
                               : "text-red-500"
                           }`}
                         >
                           {passwordCriteria.uppercase ? "✔" : "✘"} A capital
                           (uppercase) letter
                         </li>
                         <li
                           className={`flex items-center ${
                             passwordCriteria.number
                               ? "text-green-500"
                               : "text-red-500"
                           }`}
                         >
                           {passwordCriteria.number ? "✔" : "✘"} A number
                         </li>
                         <li
                           className={`flex items-center ${
                             passwordCriteria.length
                               ? "text-green-500"
                               : "text-red-500"
                           }`}
                         >
                           {passwordCriteria.length ? "✔" : "✘"} Minimum 8
                           characters
                         </li>
                       </ul>
                     </div>
                  ) : (
                    <>
                     {errors.emptyPass && (
                      <p className="text-red-500">{errors.emptyPass.message}</p>
                    )}
                    </>
                  )} */}
                </div>
                <div>
                  <label
                    htmlFor="confirm-password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900"
                  >
                    Confirm password
                  </label>
                  <input
                    type="password"
                    name="confirm-password"
                    id="confirm-password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-900 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    // required
                    {...register("confirmPassword")}
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-500">
                      {errors.confirmPassword.message}
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
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="terms"
                      className="font-light text-gray-500 dark:text-gray-500"
                    >
                      I accept the
                      <Link
                        className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                        to="#"
                      >
                        Terms and Conditions
                      </Link>
                    </label>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-indigo-500 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-indigo-500 dark:hover:bg-indigo-700 dark:focus:ring-primary-800"
                >
                  Create an account
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-500">
                  Already have an account?
                  <Link
                    to="/signin"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Login here
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
