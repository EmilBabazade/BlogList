import {Request, Response, Router} from 'express'
import Blog from '../models/Blog'
import 'express-async-errors'

const blogs = Router()

blogs.get('/', async (_: Request, res: Response) => {
	const blogsDb = await Blog.find({})
	res.json(blogsDb)
})

blogs.post('/', async (req: Request, res: Response) => {
	const blog = new Blog(req.body)
	const newBlog = await blog.save()
	res.status(200).json(newBlog)
})

blogs.delete('/:id', async (req: Request, res: Response) => {
	const id = req.params['id']
	await Blog.findByIdAndDelete(id)
	res.status(204).end()
})

export default blogs