import { Router } from "express";
import { getAllUsers, forgotPassword, sendOtpForPasswordReset, verifyOtpAndResetPassword } from "../controllers/getAllUser_forgotPassword";

export const Router = Router();


userRouter.get("/users", getAllUsers);
userRouter.post("/users/auth/forgotPassword", forgotPassword);
userRouter.post('/forgot-password/send-otp', sendOtpForPasswordReset);
userRouter.post('/forgot-password/verify-otp', verifyOtpAndResetPassword);
