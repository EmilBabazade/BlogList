"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
require("express-async-errors");
var users = express_1.Router();
users.get('/', function (req, res) {
    res.send('hello');
});
exports.default = users;
