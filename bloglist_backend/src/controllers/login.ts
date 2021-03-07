import {Router, Request, Response} from 'express'
import bcrypt from 'bcrypt'
import User from '../models/User'
import jwt from 'jsonwebtoken'
import {TOKEN_SECRET} from '../utils/config'
import 'express-async-errors'

const loginRouter = Router()

loginRouter.post('/', async (req: Request, res: Response) => {
	const {username, password} = req.body

	const user = await User.findOne({username: username})
	const passwordCorrect = user === null
		? false
		: await bcrypt.compare(password, user.passwordHash)

	if(!(user && passwordCorrect)) {
		throw 'unauthorized'
	}

	// too lazy to not assume TOKEN_SECRET will always not be null 
	const token = jwt.sign({
		username: user.username,
		id: user._id
	}, TOKEN_SECRET)

	res.status(200).send({token, username: user.username, name: user.name})
})

export default loginRouter