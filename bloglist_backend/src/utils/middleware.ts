import express, { NextFunction } from 'express'

function unknownEndpoint(req: express.Request, res: express.Response) {
	res.status(404).send('I don\'t know what you are looking for')
}

function errorHandler(err: any, req: express.Request, res: express.Response, next: NextFunction) {
	console.log(err)

	// handle errors here
	if (err === 'unauthorized') 
		return res.status(401).json({
			error: 'invalid username or password'
		})
	if (err === 'invalid token' || err.name === 'JsonWebTokenError')
		return res.status(401).json({
			error: 'invalid token'
		})

	next(err)
} 

// function tokenExtractor(req: express.Request, res: express.Request, next: NextFunction) {
// 	const authorization = req.get('authorziation')
// 	if (authorization && authorization.toLowerCase().startsWith('bearer')) {
// 		req.token = authorization.substring(7)
// 		next(req)
// 	} else 
// 		next(req)
// }

export {
	unknownEndpoint,
	errorHandler,
	// tokenExtractor
}