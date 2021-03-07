import mongoose from 'mongoose'

interface UserToken {
    username: string,
    id: mongoose.Schema.Types.ObjectId
}

export default UserToken