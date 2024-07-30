import Joi from "joi";

export const userSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    otherNames: Joi.string(),
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(4).required(),
    confirmPassword: Joi.ref('password'),

}).with('password', 'confirmPassword')

export const loginValidator = Joi.object({
    username: Joi.string(),
    email: Joi.string().email(),
    password: Joi.string().required(),
});