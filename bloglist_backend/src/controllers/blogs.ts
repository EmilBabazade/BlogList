import {Request, Response, Router} from 'express'
import Blog from '../models/Blog'
import User from '../models/User'
import jwt from 'jsonwebtoken'
import {TOKEN_SECRET} from '../utils/config'
import UserToken from '../types/UserToken'
import 'express-async-errors'

const blogs = Router()

blogs.get('/', async (_: Request, res: Response) => {
	const blogsDb = await Blog.find({}).populate('user', {
		name: 1,
		username: 1
	})
	res.json(blogsDb)
})

const tokenExtractor = (req: Request): string|null => {
	const authorization = req.get('auth')
	if (authorization && authorization.toLowerCase().startsWith('bearer')) {
		return authorization.substring(7)
	}
	return null
}

blogs.post('/', async (req: Request, res: Response) => {
	const {title, author, url, likes} = req.body
	const token = tokenExtractor(req)
	if(token === null)
		throw 'invalid token'
	const decodedToken = jwt.verify(token, TOKEN_SECRET) as UserToken
	// if token valid then user exist ( unless user gets deleted from db after user logs in)
	const user = (await User.findById(decodedToken.id))!

	const blog = new Blog({
		title, author, url, likes,
		user: user._id
	})
	const newBlog = await blog.save()
	user.blogs = user.blogs.concat(newBlog._id)
	await user.save()
	res.status(200).json(newBlog)
})

blogs.delete('/:id', async (req: Request, res: Response) => {
	const id = req.params['id']
	await Blog.findByIdAndDelete(id)
	res.status(204).end()
})

blogs.put('/:id', async (req: Request, res: Response) => {
	const id = req.params['id']
	await Blog.findByIdAndUpdate(id, {likes: req.body.likes})
	res.status(200).end()
})

export default blogs