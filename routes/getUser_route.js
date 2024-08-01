import { Router } from "express";
import { getAllUsers, sendOtpForPasswordReset, verifyOtpAndResetPassword } from "../controllers/getAllUser_forgotPassword.js";

export const getUserRouter = Router();


getUserRouter.get("/users", getAllUsers);
// getUserRouter.post("/users/auth/forgotPassword", forgotPassword);
getUserRouter.post('/forgot-password/send-otp', sendOtpForPasswordReset);
getUserRouter.post('/forgot-password/verify-otp', verifyOtpAndResetPassword);
