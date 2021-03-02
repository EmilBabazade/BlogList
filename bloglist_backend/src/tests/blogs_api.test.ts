import app from '../app'
import supertest from 'supertest'
import mongoose from 'mongoose'
import Blog from '../models/Blog'
import helper from './blogs_api_helper'

const api = supertest(app)

beforeEach(async () => {
	await Blog.deleteMany({})

	const promises = helper.initialBlogs.map(b => new Blog(b).save())
	await Promise.all(promises)
})

describe('getting blogs from database', () => {
	test('returns correct amount', async () => {
		const blogs = await api
			.get('/api/blogs')
			.expect(200)
			.expect('Content-Type', /application\/json/)

		expect(blogs.body.length).toBe(helper.initialBlogs.length)
	})
})

describe('creating blogs', () => {
	test('successfully creates a blog', async () => {
		const newBlog = {
			title: 'New BLOG',
			author: 'New BLOG',
			url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
			likes: 55
		}

		const response = await api
			.post('/api/blogs')
			.send(newBlog)
			.expect(200)
			.expect('Content-Type', /application\/json/)
		const savedBlog = response.body
		delete savedBlog.id
		expect(savedBlog).toEqual(newBlog)
        
		const blogsInDb = await helper.blogsInDB()
		expect(blogsInDb.length).toBe(helper.initialBlogs.length + 1)
	})
})

afterAll(async () => await mongoose.connection.close())