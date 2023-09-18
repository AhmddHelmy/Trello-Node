import {UserModel} from '../../db/models/user.model.js'
import jwt from 'jsonwebtoken'

export const isAuthenticated = async (req, res, next) => {
    try {
        const {token} = req.headers
        const decoded = jwt.verify(token, 'signature')
        if (!decoded.id) {
            return res.status(400).json({message: 'invalid token'})
        }
        const user = await UserModel.findById(decoded.id).select("-password")
        if (!user) {
            return res.status(400).json({message: 'please sign in first'})
        }
        req.user = user
        next()
    } catch(err) {
        return res.status(500).json({message: 'server error'})
    }
}