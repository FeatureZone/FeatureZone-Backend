import { Router } from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { addComment, deleteComment, getComments, updateComment } from "../controllers/comment_controller.js";

export const commentRouter = Router()

commentRouter.post ('/users/comments', isAuthenticated, addComment);

commentRouter.get('/users/favourites', isAuthenticated, getComments);

commentRouter.patch('/users/favourites/:id', isAuthenticated, updateComment);

commentRouter.delete('/users/favourites/:id', isAuthenticated, deleteComment);


