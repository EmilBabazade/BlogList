import mongoose from 'mongoose'
import cors from 'cors'
import bodyParser from 'body-parser'
import {MONGODB_URI} from './utils/config'
import logger from './utils/logger'
import morgan from 'morgan'
import express from 'express'
import blogsRouter from './controllers/blogs'
import usersRouter from './controllers/users'
import loginRouter from './controllers/login'
import {errorHandler, unknownEndpoint} from './utils/middleware'

const app = express()

// middlewares
app.use(express.static('../static'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
// app.use(tokenExtractor)
app.use(cors())
if(process.env.NODE_ENV !== 'test')
	app.use(morgan('tiny'))

// db connection
mongoose.connect(MONGODB_URI!, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	useCreateIndex: true,
}).then(() => logger.info('**************Connected to DB**************'))
	.catch(err => logger.error(err))

// routes
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(unknownEndpoint)
app.use(errorHandler)

export default app