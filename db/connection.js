import mongoose from 'mongoose'

export const connectDB = async () => {
    await mongoose.connect('mongodb://localhost:27017/trello')
        .then(() => console.log('DB Connected'))
        .catch((err) => console.log(err))
}