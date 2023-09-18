import joi from "joi";

export const updateProfileSchema = joi.object({
    profileId: joi.string().required(),
    username: joi.string(),
    phone: joi.string().regex(/^(002)?(01)[0125][0-9]{8}$/),
    age: joi.number().positive().min(8).max(80),
    gender: joi.string().valid('male', 'female')
}).required()

export const deleteProfileSchema = joi.object({
    profileId: joi.string().required(),
}).required()

export const logOutSchema = joi.object({
    profileId: joi.string().required(),
}).required()