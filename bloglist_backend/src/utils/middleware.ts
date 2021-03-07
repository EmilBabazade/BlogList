import express, { NextFunction } from 'express'

function unknownEndpoint(req: express.Request, res: express.Response) {
	res.status(404).send('I don\'t know what you are looking for')
}

function errorHandler(err: any, req: express.Request, res: express.Response, next: NextFunction) {
	console.log(err)

	// handle errors here
	if (err === 'unauthorized') 
		res.status(401).json({
			error: 'invalid username or password'
		})

	next(err)
} 

export {
	unknownEndpoint,
	errorHandler
}