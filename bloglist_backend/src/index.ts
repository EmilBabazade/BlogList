import app from './app'
import logger from './utils/logger'
import {PORT} from './utils/config'
import http from 'http'

const server = http.createServer(app)

server.listen(PORT, () => {
	logger.info(`Server running on port ${PORT}`)
})