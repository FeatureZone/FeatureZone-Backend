import Joi from "joi";

export const userProfileValidator = Joi.object({
    profilePicture: Joi.string(),
    sex: Joi.string().valid('male', 'female').required(),
    address: Joi.string(),
    dateOfBirth: Joi.string().required(),
    bio: Joi.string(),
    contact: Joi.string(),
    User: Joi.string(),
   
});