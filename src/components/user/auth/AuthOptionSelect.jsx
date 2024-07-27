import React from "react";
import { Link } from "react-router-dom";
import GoogleLoginButton from "../../googleAuth/GoogleLoginButton";
import GithubLogin from "../../gitHubAuth/GithubLoginButton";
import { Stack } from "@mui/material";

export const AuthOptionSelect = () => {
  return (
    <>
      <section className="">
        <Link to={"/"}>
          <div className="ms-10 mt-10 border border-gray-500 w-[140px] rounded-md flex items-start justify-center">
            <p className="text-gray-600 ">Back to Home</p>
          </div>
        </Link>
        <div className="flex flex-col items-center justify-center px-6 mx-auto md:h-screen lg:py-0">
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
              <div className="">
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  <span>Login with</span>
                </p>

                <Stack spacing={2} width={"100%"} marginTop={"10px"}>
                  <div>
                    <Link
                    to={'/signin/email'}
                      className="w-full p-2 border flex justify-center items-center gap-2"
                    >
                      <img
                        className="w-[20px]"
                        src="https://cdn4.iconfinder.com/data/icons/social-media-logos-6/512/112-gmail_email_mail-512.png"
                        alt="email"
                      />
                      Login with Email
                    </Link>
                  </div>
                  <GoogleLoginButton />
                  <GithubLogin />
                </Stack>
                <div className="mt-5">
                <hr className="w-full h-[2px] border-1 border-gray-500" />
                <p className="text-sm font-light text-gray-500 dark:text-gray-500 mt-5">
                  Don't have an account yet?
                  <Link
                    to="/register"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Register here
                  </Link>
                </p>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
