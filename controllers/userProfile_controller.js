import { UserProfileModel } from "../models/userProfile_model.js";
import { userProfileValidator } from "../validators/userProfile_validator.js";
import { UserModel } from "../models/user_model.js";


// Create UserProfile

export const createUserProfile = async (req, res) => {

    try {
        const { error, value } = userProfileValidator.validate({
            ...req.body,
            profilePicture: req.files?.profilePicture[0].filename
        });

        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        const userId = req?.user?.id;

        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).send("User not found");
        }

        console.log(value)

        const profile = await UserProfileModel.create({ ...value, user: userId });

        user.userProfile = profile._id;

        await user.save();

        res.status(201).json({ message: "Profile Created" });
    } catch (error) {
        console.log(error);
    }
};
   
   
//    Update UserProfile

export const updateUserProfile = async (req, res) => {
    try {
      const { error, value } = userProfileValidator.validate({
        ...req.body,
        profilePicture: req.files.profilePicture[0].filename
      });
  
      if (error) {
        return res.status(400).send(error.details[0].message);
      }
  
      const userId = req?.user?.id;
      const user = await UserModel.findById(userId);
      if (!user) {
        return res.status(404).send("User not found");
      }
  
      const profile = await UserProfileModel.findByIdAndUpdate(req.params.id, value, { new: true });
        if (!profile) {
            return res.status(404).send("Profile not found");
        }
  
      res.status(201).json({message: "Profile Updated"});
    } catch (error) {
      console.log(error);
    }
  };


//   Get User Profile

export const getUserProfile = async (req, res) => {
    try {
    //  Get user id 
      const userId = req?.user?.id
      const profile = await UserProfileModel.findOne({ user: userId }).populate({
        path: 'user',
        select: '-password'
      });
      if (!profile) {
        return res.status(404).json({profile});
      }
      res.status(200).json({profile});
    } catch (error) {
      return res.status(500).json({error})
    }
  };
