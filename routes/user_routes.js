import {Router} from "express";
import {signup, login, logout  } from "../controllers/user_controller.js"; 


export const userRouter = Router();

userRouter.post("/users/auth/signup", signup);

userRouter.post("/users/auth/token/login", login);

userRouter.post("users/auth/logout", logout)