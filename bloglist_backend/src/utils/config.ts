import dotenv from 'dotenv'

dotenv.config()

const MONGODB_URI = process.env.NODE_ENV === 'test'
	? process.env.MONGODB_URL_TEST
	: process.env.MONGODB_URL
const PORT = process.env.PORT

export {
	MONGODB_URI,
	PORT
}