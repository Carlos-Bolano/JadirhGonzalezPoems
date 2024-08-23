import { z } from "zod";

export const CreatePoemSchema = z.object({
  title: z
    .string({
      required_error: "Title is required",
    })
    .min(2, {
      message: "Title must be at least 2 characters long",
    })
    .max(50),
  content: z.string({
    required_error: "Content is required",
  }),
  date: z.string().optional(),
  readingTime: z.number({
    required_error: "Reading time is required",
  }),
  author: z.string().optional().default("Jadirh Gonzalez"),
});

export const UpdatePoemSchema = z.object({
  title: z
    .string()
    .min(2, {
      message: "Title must be at least 2 characters long",
    })
    .max(50),
  content: z.string().min(2, {
    message: "Content must be at least 2 characters long",
  }),
  date: z.string().optional(),
  readingTime: z.number().optional(),
  author: z.string().optional(),
});
