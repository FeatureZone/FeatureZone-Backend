import Joi from "joi";

export const codeSnippetSchema = Joi.object({
    title:Joi.string().required(),
    content:Joi.string().required(),
    language:Joi.string().required(),
    description:Joi.string().required()

});