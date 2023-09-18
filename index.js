import express from 'express'
import {authRouter} from './src/modules/auth/auth.routes.js'
import {profileRouter} from './src/modules/profile/profile.routes.js'
import {tasksRouter} from './src/modules/tasks/tasks.routes.js'
import { connectDB } from './db/connection.js'

const app = express()
const port = 3000

connectDB()

app.use(express.json())

app.use(authRouter)
app.use(profileRouter)
app.use(tasksRouter)

app.use('*', (req, res, next) => {
    return res.status(404).json({message: 'Page Not Found'})
})

app.listen(port, () => {
    console.log(`App Running On Port ${port}`)
})