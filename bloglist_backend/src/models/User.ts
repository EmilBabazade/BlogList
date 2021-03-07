import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
	name: String,
	username: String,
	passwordHash: String,
	blogs: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Blog'
		}
	]
})

userSchema.set('toJSON', {
	transform: (_: any, returnedObject: any) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
		delete returnedObject.passwordHash
	}
})

interface UserDoc extends mongoose.Document {
    name: string,
	username: string,
	passwordHash: string,
    blogs: mongoose.Schema.Types.ObjectId[]
}

export default mongoose.model<UserDoc>('User', userSchema)