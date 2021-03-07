import dotenv from 'dotenv'

dotenv.config()

const MONGODB_URI: string = process.env.NODE_ENV === 'test'
	? process.env.MONGODB_URL_TEST!
	: process.env.MONGODB_URL!
const PORT: string = process.env.PORT!
const TOKEN_SECRET: string = process.env.TOKEN_SECRET!

export {
	MONGODB_URI,
	PORT,
	TOKEN_SECRET
}