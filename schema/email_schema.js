import Joi from "joi";

export const emailSchema = Joi.object({
    email: Joi.string().email().required(),
  });
  
  
  export const passwordSchema = Joi.object({
    password: Joi.string()
      .min(8)
      .messages({
        "string.min": "Password must be at least 8 characters long.",
      })
      .pattern(/[0-9]/)
      .messages({
        "string.pattern.base": "Password must include at least one number.",
      })
      .required()
      .messages({
        "any.required": "Password is required.",
      }),
  });
  
  
  