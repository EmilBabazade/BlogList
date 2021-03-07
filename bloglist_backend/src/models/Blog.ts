import mongoose from 'mongoose'

const blogSchema = new mongoose.Schema({
	title: String,
	author: String,
	url: String,
	likes: Number,
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}
})

blogSchema.set('toJSON', {
	transform: (_: any, returnedObject: any) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	},
})

interface BlogDoc extends mongoose.Document {
    title: string,
	author: string,
	url: string,
	likes: number,
    user: mongoose.Schema.Types.ObjectId
}

export default mongoose.model<BlogDoc>('Blog', blogSchema)