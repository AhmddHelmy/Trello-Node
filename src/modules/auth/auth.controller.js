import {UserModel} from '../../../db/models/user.model.js'
import jwt from 'jsonwebtoken'
import {compareSync} from 'bcryptjs'
import {sendEmail} from '../../utils/sendEmail.js'

export const signup = async (req, res, next) => {
    const {email} = req.body
    const userexist = await UserModel.findOne({email})
    if (userexist) {
        return res.json(409).json({message: 'conflict'})
    }
    const newuser = UserModel.create(req.body)
    const token = jwt.sign({id: newuser._id, email: newuser.email}, 'signature')
    const confirmationLink = `http://localhost:3000/auth/${token}/confirm-email`
    const emailInfo = await sendEmail({
        to: newuser.email, 
        subject: 'Confirm Your Email', 
        html: `<a href="${confirmationLink}"> Confirm account </a>`
    })
    if (!emailInfo.accepted.length) {
        return res.status(503).json({message: 'cannot send email'})
    }
    return res.status(201).json({message: 'please check your email to confirm your account!'})
}

export const confirmEmail = async (req, res, next) => {
    const {token} = req.params
    const decoded = jwt.verify(token, 'signature')
    if (!decoded?.id) {
        return res.status(500).json({message: 'invalid token'})
    }
    await UserModel.findByIdAndUpdate(decoded.id, {verified: true}, {new: true})
    return res.status(200).json({message: 'email confirmed'})
}

export const logIn = async (req, res, next) => {
    const {email, password} = req.body
    const user = await UserModel.findOne({email})
    if (!user) {
        return res.status(400).json({message: "In-valid Login Informations"})
    }
    const matchPassword = compareSync(password, user.password)
    if (!matchPassword) {
        return res.status(400).json({message: "In-valid Login Informations"})
    }
    if (user.isDeleted) {
        return res.status(404).json({message: "accound has been deleted"})
    }
    if (!user.verified) {
        return res.status(400).json({message: "please confirm your email first"})
    }
    await UserModel.findByIdAndUpdate(user._id, {isLoggedIn: true})
    const token = jwt.sign({id: user._id, email: user.email}, 'signature')
    return res.status(200).json({message: 'Logged In Successfully', token})
}
