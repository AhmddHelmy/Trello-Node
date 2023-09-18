import { UserModel } from "../../../db/models/user.model.js"

export const updateProfile = async (req, res, next) => {
    const {profileId} = req.params
    const {id} = req.user
    const profile = await UserModel.findById(profileId)
    if (!profile) {
        return res.status(404).json({message: 'profile not found'})
    }
    if (!profile.isDeleted) {
        return res.status(404).json({message: 'profile has been deleted'})
    }
    if (profile._id.toString() != id.toString()) {
        return res.status(404).json({message: 'not allowed'})
    }
    await UserModel.updateOne({_id: id}, req.body)
    return res.status(200).json({message: 'done'})
}

export const softDeleteProfile = async (req, res, next) => {
    const {profileId} = req.params
    const {id} = req.user
    const profile = await UserModel.findById(profileId)
    if (!profile) {
        return res.status(404).json({message: 'profile not found'})
    }
    if (!profile.isDeleted) {
        return res.status(404).json({message: 'profile has been deleted'})
    }
    if (profile._id.toString() != id.toString()) {
        return res.status(404).json({message: 'not allowed'})
    }
    await UserModel.updateOne({_id: id}, {isDeleted: true})
    return res.status(200).json({message: 'done'})
}

export const deleteProfile = async (req, res, next) => {
    const {profileId} = req.params
    const {id} = req.user
    const profile = await UserModel.findById(profileId)
    if (!profile) {
        return res.status(404).json({message: 'profile not found'})
    }
    if (!profile.isDeleted) {
        return res.status(404).json({message: 'profile has been deleted'})
    }
    if (profile._id.toString() != id.toString()) {
        return res.status(404).json({message: 'not allowed'})
    }
    await UserModel.deleteOne({_id: id})
    return res.status(200).json({message: 'done'})
}

export const logOut = async (req, res, next) => {
    const {profileId} = req.params
    const {id} = req.user
    const profile = await UserModel.findById(profileId)
    if (!profile) {
        return res.status(404).json({message: 'profile not found'})
    }
    if (!profile.isDeleted) {
        return res.status(404).json({message: 'profile has been deleted'})
    }
    if (profile._id.toString() != id.toString()) {
        return res.status(404).json({message: 'not allowed'})
    }
    await UserModel.updateOne({_id: id}, {isLoggedIn: false})
    return res.status(200).json({message: 'done'})
}