import { Router } from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { addFavourite, deleteFavourite, getAllFavourite, getOneFavourite, updateFavourite } from "../controllers/favourite_controller.js";

export const favouriteRouter = Router();

favouriteRouter.post('/users/favourites',isAuthenticated, addFavourite);

favouriteRouter.get('/users/favourites',isAuthenticated, getAllFavourite);

favouriteRouter.patch('/users/favourites/:id', isAuthenticated, updateFavourite);

favouriteRouter.get('/users/favourites/:id',isAuthenticated,getOneFavourite);

favouriteRouter.delete('/users/favourites/:id', isAuthenticated, deleteFavourite)