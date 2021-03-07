import {Router, Request, Response} from 'express'
import bcrypt from 'bcrypt'
import 'express-async-errors'

const users = Router()

users.get('/', (req: Request, res: Response) => {
	res.send('hello')
})

export default users