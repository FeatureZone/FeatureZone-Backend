import Joi from "joi";

export const userProfileVaildator = Joi.object({
    profilePicture: Joi.string(),
    sex: Joi.string().valid('male', 'female').required(),
    maritalStatus: Joi.string(),
    address: Joi.string().required(),
    dateOfBirth: Joi.string().required(),
    bio: Joi.string(),
    contact: Joi.string(),

});