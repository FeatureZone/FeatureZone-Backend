import Joi from "joi";


export const favouriteValidator = Joi.object({
    itemType:Joi.string().valid('snippet', 'contributor', 'component', 'comment', 'repository', 'documentation'),
    notes:Joi.string().max(100),
    status:Joi.string().valid('actve', 'archived'),
    priority:Joi.number()
});