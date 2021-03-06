"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TOKEN_SECRET = exports.PORT = exports.MONGODB_URI = void 0;
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var MONGODB_URI = process.env.NODE_ENV === 'test'
    ? process.env.MONGODB_URL_TEST
    : process.env.MONGODB_URL;
exports.MONGODB_URI = MONGODB_URI;
var PORT = process.env.PORT;
exports.PORT = PORT;
var TOKEN_SECRET = process.env.TOKEN_SECRET;
exports.TOKEN_SECRET = TOKEN_SECRET;
