import {NextFunction, Request, Response, Router} from 'express'
import app from '../app'
import Blog from '../models/Blog'

const blogs = Router()

blogs.get('/', (req: Request, res: Response, next: NextFunction) => {
	Blog
		.find({})
		.then(blogsDb => res.json(blogsDb))
		.catch(err => next(err))
})

blogs.post('/', (req: Request, res: Response) => {
	const blog = new Blog(req.body)

	blog
		.save()
		.then(newBlog => res.status(200).json(newBlog))
})

export default blogs