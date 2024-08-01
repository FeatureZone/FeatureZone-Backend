import { UserModel } from "../models/user_model.js";
import { CodeSnippetModel } from "../models/codeSnippet_model.js";


export const addFavourites = async (req, res, next) => {
    try {
        // Get id from user
        const userId = req.user.id;
        // Get id from code snippet
        const snippetId = req.params.snippetId;

        // Find user by Id in database
        const user = await UserModel.findById(userId)
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Find if snippet is already in user's favourites
        if (user.favourites.includes(snippetId)) {
            return res.status(400).json({ message: 'Snippet already in favourites' });
        }
        // Add snippetId to favourites array
        user.favourites.push(snippetId);
        await user.save();
        res.status(200).json({ message: 'Snippet added to favorites', favourites: user.favourites });
    } catch (error) {
        next(error)
    }
};


export const removeFavourites = async (req, res, next) => {
    try {
        // Get id from user
        const userId = req.user.id;
        // Get id from code snippet
        const snippetId = req.params.snippetId;
        // Find user by Id in database
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Find if snippet is already in user's favourites
        if (!user.favourites.includes(snippetId)) {
            return res.status(400).json({ message: 'Snippet not found in favourites' });
        }

        // Filter out the snippetId from the user's favourites array
        user.favourites = user.favourites.filter(id => id.toString() !== snippetId);
        await user.save();

        res.status(200).json({ message: 'Snippet removed from favorites', favorites: user.favourites });
    } catch (error) {
        next(error);
    }
};
