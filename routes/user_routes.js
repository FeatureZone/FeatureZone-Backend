import {Router} from "express";
import {signup, login, logout, getOneUser, updateUser, deleteUser  } from "../controllers/user_controller.js"; 
import { hasPermission, isAuthenticated } from "../middlewares/auth.js";


export const userRouter = Router();

userRouter.post("/users/auth/signup", signup);

userRouter.post("/users/auth/token/login", login);

userRouter.post("/users/auth/logout",isAuthenticated, logout);

userRouter.get("/users/:Id",isAuthenticated, hasPermission('read_users'), getOneUser);

userRouter.patch("/users/:Id",isAuthenticated, hasPermission('update_user'), updateUser);

userRouter.delete("/users/:Id",isAuthenticated, hasPermission('delete_user'), deleteUser);