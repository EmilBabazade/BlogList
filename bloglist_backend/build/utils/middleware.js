"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.unknownEndpoint = void 0;
function unknownEndpoint(req, res) {
    res.status(404).send('I don\'t know what you are looking for');
}
exports.unknownEndpoint = unknownEndpoint;
function errorHandler(err, req, res, next) {
    console.log(err);
    // handle errors here
    if (err === 'unauthorized')
        res.status(401).json({
            error: 'invalid username or password'
        });
    next(err);
}
exports.errorHandler = errorHandler;
