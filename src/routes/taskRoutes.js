import express from "express";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";
import { authenticate } from "../middleware/authenticate.js";
import {
  validate,
  createTaskSchema,
  updateTaskSchema,
} from "../middleware/validation.js";

const router = express.Router();

// All routes require authentication
router.use(authenticate);

router.get("/", getTasks);
router.post("/", validate(createTaskSchema), createTask);
router.patch("/:id", validate(updateTaskSchema), updateTask);
router.delete("/:id", deleteTask);

export default router;