import Joi from "joi";

export const userValidator = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    otherNames: Joi.string(),
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    role: Joi.string().valid('user', 'admin').default('user'),
    password: Joi.string().min(4).required(),
    confirmPassword: Joi.ref('password'),
    termsAndConditions: Joi.boolean().required(),
    
}).with('password', 'confirmPassword')

export const loginValidator = Joi.object({
    username: Joi.string(),
    email: Joi.string().email(),
    password: Joi.string().required(),
});
   
export const updateUserValidator = Joi.object({
    name: Joi.string(),
    role: Joi.string().valid('admin'),
});
    
