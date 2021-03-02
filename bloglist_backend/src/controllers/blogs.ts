import {Router} from 'express'
import app from '../app'
import Blog from '../models/Blog'

const Blogs = Router()

Blogs.get('/', (req, res) => {
	res.send('hello')
})

export default Blogs