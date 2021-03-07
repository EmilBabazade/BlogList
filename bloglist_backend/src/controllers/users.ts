import {Router, Request, Response} from 'express'
import bcrypt from 'bcrypt'
import User from '../models/User'
import 'express-async-errors'

const users = Router()

users.get('/', (req: Request, res: Response) => {
	res.send('hello')
})

users.post('/', async (req: Request, res: Response) => {
	const {name, username, password} = req.body
	const passwordHash = await bcrypt.hash(password, 10)
	const user = new User({ name, username, passwordHash })
	const newUser = await user.save()
	res.status(201).json(newUser)
})

export default users