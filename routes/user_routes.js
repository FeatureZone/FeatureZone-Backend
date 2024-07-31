import {Router} from "express";
import {signup, login, logout, getOneUser, updateUser, deleteUser  } from "../controllers/user_controller.js"; 


export const userRouter = Router();

userRouter.post("/users/auth/signup", signup);

userRouter.post("/users/auth/token/login", login);

userRouter.post("users/auth/logout", logout);

userRouter.get("users/:userId", getOneUser);

userRouter.patch("users/:userId", updateUser);

userRouter.delete("users/:userId", deleteUser);