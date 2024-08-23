import { z } from "zod";

export const signupSchema = z.object({
  username: z
    .string({
      required_error: "First name is required",
    })
    .min(2, {
      message: "First name must be at least 2 characters long",
    })
    .max(50),

  email: z
    .string({
      required_error: "Email is required",
    })
    .email(),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(6, {
      message: "Password must be at least 6 characters long",
    })
    .max(50),
});

export const signinSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email(),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(6, {
      message: "Password must be at least 6 characters long",
    })
    .max(50),
});
