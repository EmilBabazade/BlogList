"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var cors_1 = __importDefault(require("cors"));
var body_parser_1 = __importDefault(require("body-parser"));
var config_1 = require("./utils/config");
var logger_1 = __importDefault(require("./utils/logger"));
var morgan_1 = __importDefault(require("morgan"));
var express_1 = __importDefault(require("express"));
var blogs_1 = __importDefault(require("./controllers/blogs"));
var users_1 = __importDefault(require("./controllers/users"));
var middleware_1 = require("./utils/middleware");
var app = express_1.default();
// middlewares
app.use(express_1.default.static('../static'));
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.use(cors_1.default());
if (process.env.NODE_ENV !== 'test')
    app.use(morgan_1.default('tiny'));
// db connection
mongoose_1.default.connect(config_1.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
}).then(function () { return logger_1.default.info('**************Connected to DB**************'); })
    .catch(function (err) { return logger_1.default.error(err); });
// routes
app.use('/api/blogs', blogs_1.default);
app.use('/api/users', users_1.default);
app.use(middleware_1.unknownEndpoint);
app.use(middleware_1.errorHandler);
exports.default = app;
