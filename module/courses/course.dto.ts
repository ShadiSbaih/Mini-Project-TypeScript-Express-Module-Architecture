import { z } from "zod";

export const CreateCourseSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters long"),
  // image will be handled by multer middleware
});

export const UpdateCourseSchema = z
  .object({
    title: z
      .string()
      .min(3, "Title must be at least 3 characters long")
      .optional(),
    description: z
      .string()
      .min(10, "Description must be at least 10 characters long")
      .optional(),
    // image will be handled by multer middleware
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided for update",
  });

export const CourseParamsSchema = z.object({
  id: z.string().min(1, "Course ID is required"),
});

export type CreateCourseDTO = z.infer<typeof CreateCourseSchema>;
export type UpdateCourseDTO = z.infer<typeof UpdateCourseSchema>;
export type CourseParamsDTO = z.infer<typeof CourseParamsSchema>;
