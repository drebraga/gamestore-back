import Joi from "joi";

export const userSchema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(4).required(),
    repeatPassword: Joi.ref("password"),
})


export const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(4).required(),
})
