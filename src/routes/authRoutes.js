import express from "express";
import {
  register,
  login,
  logout,
} from "../controllers/authController.js";
import { validate, registerSchema, loginSchema } from "../middleware/validation.js";

const router = express.Router();

// Public routes
router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);
router.post("/logout", logout);

export default router;