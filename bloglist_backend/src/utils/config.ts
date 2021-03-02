import dotenv from 'dotenv'

dotenv.config()

const MONGODB_URI = process.env.MONGODB_URL
const PORT = process.env.PORT

export {
	MONGODB_URI,
	PORT
}