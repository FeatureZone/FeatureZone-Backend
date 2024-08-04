import { Router } from "express";
import { followUser, unfollowUser, getFollowers, getFollowing } from "../controllers/followers_controller.js";

export const followRouter = Router();


Router.post('/users/following/:followerId', followUser);

Router.delete('/users/following/:followerId', unfollowUser);

Router.get('/users/followers', getFollowers);

Router.get('/users/following', getFollowing);