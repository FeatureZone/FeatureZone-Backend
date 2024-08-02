import { Router } from "express";
import {createUserProfile,updateUserProfile,getUserProfile }from "../controllers/userProfile_controller.js";
import { isAuthenticated } from "../middlewares/auth.js";



export const userProfileRouter = Router();

userProfileRouter.post('/userprofile/create', isAuthenticated , createUserProfile);

userProfileRouter.patch('/userprofile/update/:id', isAuthenticated , updateUserProfile);

userProfileRouter.get('/profile', isAuthenticated , getUserProfile);

export default userProfileRouter;
