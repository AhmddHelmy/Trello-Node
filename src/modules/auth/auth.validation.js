import joi from 'joi'

export const signupSchema = joi.object({
    username: joi.string().required(),
    email: joi.string().email({maxDomainSegments:2}).required(),
    password: joi.string().required(),
    phone: joi.string().regex(/^(002)?(01)[0125][0-9]{8}$/),
    age: joi.number().positive().min(8).max(80),
    gender: joi.string().valid('male', 'female')
}).required()

export const loginSchema = joi.object({
    email: joi.string().email({maxDomainSegments:2}).required(),
    password: joi.string().required(),
}).required()

