import express from 'express'

function unknownEndpoint(req: express.Request, res: express.Response) {
	res.status(404).send('I don\'t know what you are looking for')
}

export {
	unknownEndpoint
}