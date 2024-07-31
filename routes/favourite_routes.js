import { Router } from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { addFavourites, removeFavourites } from "../controllers/favourite_controller.js";

export const favouriteRouter = Router();

favouriteRouter.post('/users/favourites', isAuthenticated, addFavourites);

favouriteRouter.delete('/users/favourites/:id', isAuthenticated, removeFavourites);