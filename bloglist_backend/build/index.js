"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = __importDefault(require("./app"));
var logger_1 = __importDefault(require("./utils/logger"));
var config_1 = require("./utils/config");
var http_1 = __importDefault(require("http"));
var server = http_1.default.createServer(app_1.default);
server.listen(config_1.PORT, function () {
    logger_1.default.info("Server running on port " + config_1.PORT);
});
