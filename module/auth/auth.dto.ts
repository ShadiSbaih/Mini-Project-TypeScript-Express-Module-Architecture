import { z } from "zod";

export const RegisterSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  email: z.email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const LoginSchema = z.object({
  email: z.email("Invalid email format"),
  password: z.string().min(1, "Password is required"),
});

export type RegisterDTO = z.infer<typeof RegisterSchema>;
export type LoginDTO = z.infer<typeof LoginSchema>;
