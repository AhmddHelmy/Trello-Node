import {Router} from 'express'
import { validation } from '../../middlewares/validation.js'
import { isAuthenticated } from '../../middlewares/isAuth.js'
import { deleteProfileSchema, logOutSchema, updateProfileSchema } from './profile.validation.js'
import { deleteProfile, logOut, softDeleteProfile, updateProfile } from './profile.controller.js'

export const profileRouter = Router()

profileRouter.put('/:profileId/update-profile', validation(updateProfileSchema), isAuthenticated, updateProfile)

profileRouter.patch('/:profileId/soft-delete-profile', validation(deleteProfileSchema), isAuthenticated, softDeleteProfile)

profileRouter.delete('/:profileId/delete-profile', validation(deleteProfileSchema), isAuthenticated, deleteProfile)

profileRouter.patch('/:profileId/logout', validation(logOutSchema), isAuthenticated, logOut)