import {Router, Request, Response} from 'express'
import bcrypt from 'bcrypt'
import User from '../models/User'
import 'express-async-errors'

const usersRouter = Router()

usersRouter.get('/', async (req: Request, res: Response) => {
	const users = await User.find({}).populate('blogs', {
		url: 1,
		title: 1,
		author: 1
	})
	res.status(200).json(users)
})

usersRouter.post('/', async (req: Request, res: Response) => {
	const {name, username, password} = req.body
	const passwordHash = await bcrypt.hash(password, 10)
	const user = new User({ name, username, passwordHash })
	const newUser = await user.save()
	res.status(201).json(newUser)
})

export default usersRouter