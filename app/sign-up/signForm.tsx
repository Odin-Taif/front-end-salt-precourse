"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import Heading from "@/app/components/reusable/Heading";
import Input from "../components/reusable/Input";
import axios from "axios";
import { signUpSchema } from "../zod-validation/zod-validiation";
import { z } from "zod";

const SignForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    // formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState({ name: "", email: "", password: "" });
  const router = useRouter();

  // const onSubmit: SubmitHandler<FieldValues> = (data) => console.log(data);
  // Function to handle form submission
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    // console.log(data);
    const validation = signUpSchema.safeParse(data);
    if (!validation.success) {
      const errorMessages = validation.error.format();
      setErrors({
        name: errorMessages.name?._errors[0] || "",
        email: errorMessages.email?._errors[0] || "",
        password: errorMessages.password?._errors[0] || "",
      });
      return;
    }
    console.log("Form data is valid:", validation.data);
    setIsLoading(true);
    axios
      .post("https://salt.odinobusi.online/api/v1/users/signup", data)
      .catch((err: any) => console.log(err))
      .then(() => {
        setIsLoading(false);
        reset();
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
              required
              validate={() => console.log("first")}
            />
            {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}

            <Input
              id="name"
              label="Full Name"
              disabled={isLoading}
              register={register}
              validate={() => console.log("first")}
              required
            />
            {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}

            <Input
              id="password"
              label="Password"
              disabled={isLoading}
              register={register}
              required
              validate={() => console.log("first")}
              type="password"
            />
            {errors.password && (
              <p style={{ color: "red" }}>{errors.password}</p>
            )}
          </form>

          <button className="btn btn-accent" onClick={handleSubmit(onSubmit)}>
            {isLoading ? (
              <span className="loading loading-spinner">Loading...</span>
            ) : (
              "Sign Up"
            )}
          </button>
        </div>
        <div className="flex flex-col py-10">
          <hr />
          <div className="text-neutral-500 text-center font-light">
            <div>
              Already have an account?{" "}
              <span
                onClick={() => router.push("/sign-in")}
                className="text-neutral-800 cursor-pointer hover:underline"
              >
                Log in
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignForm;
