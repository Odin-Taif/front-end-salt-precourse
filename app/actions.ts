"use server";
import { revalidatePath } from "next/cache";
import { signUpSchema } from "../drizzle/dbschema/zod-validations";
import axios from "axios";

// Signup Server Action
export async function signupAction(prevState: any, formData: FormData) {
  // Extract form data
  const id = formData.get("id")?.toString();
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const name = formData.get("name")?.toString();

  const userValidated = signUpSchema.safeParse({ id, email, password, name });

  // To be discussed with Marcus, If it is better to refelect the error message from the server |
  // or to use the generic message below
  // also what If I want to chain some other actions with a successful signup, how do I do that?

  if (!userValidated.success) {
    const errors = userValidated.error.flatten().fieldErrors;
    const errorMessages: Record<string, string> = {};

    if (errors.email) {
      errorMessages.email =
        "Email is required and should be a valid email address.";
    }
    if (errors.password) {
      errorMessages.password =
        "Password is required and must be at least 6 characters long.";
    }
    if (errors.name) {
      errorMessages.name =
        "Name is required and should be at least 3 characters long.";
    }
    return {
      success: false,
      message: "Validation failed. Please check your input.",
      errors: errorMessages,
    };
  }
  // -=-=-=-=-=-=-=-=-=--=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  try {
    const response = await axios.post(
      "https://salt.odinobusi.online/api/v1/users/signup",
      { email, password, name }
    );

    if (response.status !== 201) {
      return {
        success: false,
        message:
          "An unexpected error occurred during sign up. Please try again.",
      };
    }

    // this is ensure that each time we add a new user to our database, we revalidate the get-users path.
    // becuse nextjs has client side caching, we need to revalidate the path to get the latest data.
    revalidatePath("/get-users");

    return {
      success: true,
      message: "User has been created successfully!",
    };
  } catch (error: any) {
    console.error("Signup Error:", error);
    return {
      success: false,
      message: "An unexpected error occurred during sign up. Please try again.",
    };
  }
}
