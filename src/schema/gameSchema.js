import Joi from "joi";

export const gameIdSchema = Joi.object({
    gameId: Joi.string().required()
});