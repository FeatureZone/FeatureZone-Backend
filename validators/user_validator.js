import Joi from "joi";

export const userValidator = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    otherNames: Joi.string(),
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    role: Joi.string().valid('user', 'therapist', 'admin').default('user'),
    password: Joi.string().min(4).required(),
    termsAndConditions: Joi.boolean().required()
    
})