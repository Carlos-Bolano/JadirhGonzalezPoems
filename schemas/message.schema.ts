import { z } from "zod";

export const CreateMessageSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Title must be at least 2 characters long",
    })
    .max(50),
  message: z.string().min(2, {
    message: "Content must be at least 2 characters long",
  }),
  email: z.string().email("Please enter a valid email address"),
});
