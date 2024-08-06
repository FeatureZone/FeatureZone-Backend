import { Router } from "express";
import {createUserProfile,updateUserProfile,getUserProfile }from "../controllers/userProfile_controller.js";
import { isAuthenticated } from "../middlewares/auth.js";
import multer from "multer";




const upload = multer({ dest: 'uploads/' }); // Configure your file storage settings here

export const userProfileRouter = Router();

userProfileRouter.post('/userprofile/create', isAuthenticated, upload.fields([{ name: 'profilePicture', maxCount: 1 }]), createUserProfile);

userProfileRouter.patch('/userprofile/update/:id', isAuthenticated, upload.fields([{ name: 'profilePicture', maxCount: 1 }]), updateUserProfile);

userProfileRouter.get('/profile', isAuthenticated, getUserProfile);

export default userProfileRouter;