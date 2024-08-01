import { Router } from "express";
import {createUserProfile,updateUserProfile,getUserProfile }from "../controllers/userProfile_controller.js";
import authenticate from "../middlewares/auth.js"


export const userProfileRouter = Router();

// Route to create a new user profile
userProfileRouter.post('/', authenticate, createUserProfile);

// Route to update an existing user profile
userProfileRouter.put('/:id', authenticate, updateUserProfile);

// Route to get a user's profile
userProfileRouter.get('/', authenticate, getUserProfile);

export default userProfileRouter;
