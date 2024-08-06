import { Router } from "express";
import { followUser, unfollowUser, getFollowers, getFollowing } from "../controllers/followers_controller.js";

export const followRouter = Router();


followRouter.post('/users/following/:followerId', followUser);

followRouter.delete('/users/following/:followerId', unfollowUser);

followRouter.get('/users/followers', getFollowers);

followRouter.get('/users/following', getFollowing);