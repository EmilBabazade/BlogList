"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var Blog_1 = __importDefault(require("../models/Blog"));
var blogs = express_1.Router();
blogs.get('/', function (req, res, next) {
    Blog_1.default
        .find({})
        .then(function (blogsDb) { return res.json(blogsDb); })
        .catch(function (err) { return next(err); });
});
blogs.post('/', function (req, res) {
    var blog = new Blog_1.default(req.body);
    blog
        .save()
        .then(function (newBlog) { return res.status(200).json(newBlog); });
});
exports.default = blogs;
