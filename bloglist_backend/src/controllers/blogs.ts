import {Request, Response, Router} from 'express'
import Blog from '../models/Blog'
import User from '../models/User'
import 'express-async-errors'

const blogs = Router()

blogs.get('/', async (_: Request, res: Response) => {
	const blogsDb = await Blog.find({}).populate('user', {
		name: 1,
		username: 1
	})
	res.json(blogsDb)
})

blogs.post('/', async (req: Request, res: Response) => {
	const {title, author, url, likes} = req.body
	const user = await User.findOne({})
	const blog = new Blog({
		title, author, url, likes,
		user: user!._id
	})
	const newBlog = await blog.save()
	user!.blogs = user!.blogs.concat(newBlog._id)
	await user!.save()
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