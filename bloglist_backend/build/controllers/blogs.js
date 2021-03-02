"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var Blogs = express_1.Router();
Blogs.get('/', function (req, res) {
    res.send('hello');
});
exports.default = Blogs;
