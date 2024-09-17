"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { Heading, Input } from "@/app/components/reusable/index";
import {
  SignInFieldValues,
  signInSchema,
} from "../zod-validation/zod-validiation";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

const SignInForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignInFieldValues>({
    resolver: zodResolver(signInSchema),
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  // Function to handle form submission
  const onSubmit: SubmitHandler<SignInFieldValues> = (data) => {
    setIsLoading(true);
    console.log("Request Data:", data); // Log the data being sent
    axios
      .post("https://salt.odinobusi.online/api/v1/users/login", data)
      .then((response) => {
        console.log("Response Data:", response.data); // Log response data
        setIsLoading(false);
        // reset();
        // router.push("/");
      })
      .catch((err) => {
        console.error("Error:", err.response ? err.response.data : err.message); // Log error response
        setIsLoading(false);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="bg-gray-100 text-black rounded m-auto p-3 w-full max-w-md sm:p-8  md:max-w-lg  md:p-8 lg:max-w-xl xl:max-w-2xl">
        <div className="flex flex-col gap-2">
          <Heading title="Saltis!" subtitle="Create an Account!" center />
          <form>
            <Input
              id="email"
              label="Email Address"
              disabled={isLoading}
              register={register}
            />
            {/* error email handling */}
            {errors.email?.message && (
              <span className="text-rose-500 px-3">
                {errors.email.message.toString()}
              </span>
            )}

            {/* -=-=-=-=-=-========= -=-=-=-=-=-========= -=-=-=-=-=-========= -=-=-=-=-=-========= */}
            <Input
              id="password"
              label="Password"
              disabled={isLoading}
              register={register}
              type="password"
            />
            {/* error password handling */}
            {errors.password?.message && (
              <span className="text-rose-500 px-3 ">
                {errors.password.message.toString()}
              </span>
            )}
          </form>

          <button className="btn btn-accent" onClick={handleSubmit(onSubmit)}>
            {isLoading ? (
              <span className="loading loading-spinner">Loading...</span>
            ) : (
              "Sign In"
            )}
          </button>
        </div>
        <div className="flex flex-col py-10">
          <hr />
          <div className="text-neutral-500 text-center font-light pt-3">
            You don't have an account.Register now!?
            <span
              onClick={() => router.push("/sign-up")}
              className="text-green-700 cursor-pointer hover:underline mx-2"
            >
              Sign up
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;
