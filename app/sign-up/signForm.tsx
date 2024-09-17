"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { Heading, Input } from "@/app/components/reusable/index";
import { signUpSchema } from "../zod-validation/zod-validiation";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";

type FieldValues = z.infer<typeof signUpSchema>;
const SignForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: zodResolver(signUpSchema),
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  // Function to handle form submission
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    // console.log(data);
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
            />
            {/* error email handling */}
            {errors.email?.message && (
              <small className="text-rose-500 px-3">
                {errors.email.message.toString()}
              </small>
            )}

            {/* -=-=-=-=-=-========= -=-=-=-=-=-========= -=-=-=-=-=-========= -=-=-=-=-=-========= */}
            <Input
              id="name"
              label="Full Name"
              disabled={isLoading}
              register={register}
            />
            {/* error name handling */}
            {errors.name?.message && (
              <small className="text-rose-500 px-3">
                {errors.name.message.toString()}
              </small>
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
              <small className="text-rose-500 px-3 ">
                {errors.password.message.toString()}
              </small>
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
              Already have an account?
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
