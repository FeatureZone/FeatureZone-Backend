
import Joi from "joi";


export const commentValidator = Joi.object({
    text: Joi.string().required().min(5).max(500),
    
})