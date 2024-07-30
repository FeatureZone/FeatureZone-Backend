import { favouriteModel } from "../models/favourite_model.js";
import { favouriteValidator } from "../validators/favourite_validator.js";
import { UserModel } from "../models/user_model.js";


// Post Favourite
export const addFavourite = async(req,res,next)=> {
try {
    // Validate using Joi
    const { error, value } = favouriteValidator(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    // Check if user exists already in database
    const userId = req?.user?.id
    const user = await UserModel.findById(userId)
    if(!user){
        return res.status(404).send('User not found')
    }
    // Create a new favourite with Id
    const favourite = await favouriteModel.create({...value, user:userId})
    // If you are able to find user and create,find a favouriteId to it
    user.favourite.push(favourite.id)
    // Save the user
    await user.save();
// return response
res.status(201).json({message: 'Favourite added ' ,favourite })

} catch (error) {
    next(error)
}
}

// Get all favourites
export const getAllFavourite = async (req, res, next) => {
    try {
    // fetching all favourites belonging to a particular user
    const userId = req?.user?.id
    const getAllFavourite = await favouriteModel.find({user:userId})
    if(getAllFavourite.length == 0){
        return res.status(404).send({favourite: getAllFavourite})
    } res.status(200).json({ favourite: getAllFavourite});
    } catch (error) {
        next(error)
    }
}


// Update favourites
export const updateFavourite = async(req,res,next)=> {
    try {
     const {error, value} = favouriteValidator.validate(req.body)
     if (error) {
        return res.status(400).send(error.details[0].message);
      }  
    //   Check if user exists already in database
      const userId = req?.user?.id
      const user = await UserModel.findById(userId)
      if (!user) {
        return res.status(404).send("User not found");
      }
      const favourite = await favouriteModel.findByIdAndUpdate(req.params.id, value, {new: true})
      if (!favourite) {
        return res.status(404).send({ favourite });
      }
       
        res.status(201).json({message: 'Favourite updated ', favourite }); 
    
    } catch (error) {
        next(error)
    }
}


// Get one favourite
export const getOneFavourite = async (req, res, next) => {
    try {
        // Check if user exists in database
        const userId = req?.user?.id;
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).send("User not found");
        }

        // Get favourite by Id
        const favouriteId = await favouriteModel.findById(req.params.id);
        if (!favouriteId) {
            return res.status(404).send("Favourite not found");
        }

        // Return response
        res.status(200).json(favouriteId);
    } catch (error) {
        next(error);
    }
};


// Delete a favourite
export const deleteFavourite = async (req, res, next) => {
    try {
       // Check if user exists in database
       const userId =  req?.user?.id; 
      const user = await UserModel.findById(userId);
      if (!user) {
        return res.status(404).send("User not found");
      }

      const favourite = await favouriteModel.findByIdAndDelete(req.params.id)
      if(!favourite){
        return res.status(404).send("Favourite not found");
      }

    // Remove favourite ID from User's Record  
      user.favourite.pull(req.params.id);
      await user.save();
    res.status(200).send("Favourite deleted");
    } catch (error) {
        next(error)
    }
}