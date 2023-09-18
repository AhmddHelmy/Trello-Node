import {Router} from 'express'
import { confirmEmail, logIn, signup } from './auth.controller.js'
import { loginSchema, signupSchema } from './auth.validation.js'
import { validation } from '../../middlewares/validation.js'

export const authRouter = Router()

authRouter.post('/register', validation(signupSchema), signup)

authRouter.get('/:token/confirm-email', confirmEmail)

authRouter.post('/login', validation(loginSchema), logIn)
