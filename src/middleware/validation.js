// import { ZodError } from "zod";
import { z ,ZodError} from "zod";

// import { ZodError } from "zod";

// Register validation schema
export const registerSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(50, "Name is too long"),
  email: z
    .string()
    .email("Invalid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(50, "Password is too long"),
});

// Login validation schema
export const loginSchema = z.object({
  email: z
    .string()
    .email("Invalid email address"),
  password: z
    .string()
    .min(1, "Password is required"),
});

// Create task validation schema
export const createTaskSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title is too long"),
  description: z
    .string()
    .max(500, "Description is too long")
    .optional(),
  priority: z
    .enum(["low", "medium", "high"])
    .default("medium"),
  dueDate: z
    .string()
    // .datetime()
    .optional()
    .nullable(),
});

// Update task validation schema
export const updateTaskSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title is too long")
    .optional(),
  description: z
    .string()
    .max(500, "Description is too long")
    .optional(),
  status: z
    .enum(["todo", "in-progress", "done"])
    .optional(),
  priority: z
    .enum(["low", "medium", "high"])
    .optional(),
  dueDate: z
    .string()
    // .datetime()
    .optional()
    .nullable(),
});

// Validation middleware
// export const validate = (schema) => (req, res, next) => {
//   try {
//     const validated = schema.parse(req.body);
//     req.body = validated;
//     next();
//   } catch (error) {
//   return res.status(400).json({
//     success: false,
//     message: "Validation failed",
//     errors: error.issues.map((err) => ({
//       field: err.path.join("."),
//       message: err.message,
//     })),
//   });
// }
// };


export const validate = (schema) => (req, res, next) => {
  try {
    const validated = schema.parse(req.body);
    req.body = validated;
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: error.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        })),
      });
    }

    next(error);
  }
};