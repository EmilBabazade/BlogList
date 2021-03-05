"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = __importDefault(require("../app"));
var supertest_1 = __importDefault(require("supertest"));
var mongoose_1 = __importDefault(require("mongoose"));
var Blog_1 = __importDefault(require("../models/Blog"));
var blogs_api_helper_1 = __importDefault(require("./blogs_api_helper"));
var api = supertest_1.default(app_1.default);
beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
    var promises;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Blog_1.default.deleteMany({})];
            case 1:
                _a.sent();
                promises = blogs_api_helper_1.default.initialBlogs.map(function (b) { return new Blog_1.default(b).save(); });
                return [4 /*yield*/, Promise.all(promises)];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
describe('getting blogs from database', function () {
    test('returns correct amount', function () { return __awaiter(void 0, void 0, void 0, function () {
        var blogs;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, api
                        .get('/api/blogs')
                        .expect(200)
                        .expect('Content-Type', /application\/json/)];
                case 1:
                    blogs = _a.sent();
                    expect(blogs.body.length).toBe(blogs_api_helper_1.default.initialBlogs.length);
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('creating blogs', function () {
    test('successfully creates a blog', function () { return __awaiter(void 0, void 0, void 0, function () {
        var newBlog, response, savedBlog, blogsInDb;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    newBlog = {
                        title: 'New BLOG',
                        author: 'New BLOG',
                        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
                        likes: 55
                    };
                    return [4 /*yield*/, api
                            .post('/api/blogs')
                            .send(newBlog)
                            .expect(200)
                            .expect('Content-Type', /application\/json/)];
                case 1:
                    response = _a.sent();
                    savedBlog = response.body;
                    delete savedBlog.id;
                    expect(savedBlog).toEqual(newBlog);
                    return [4 /*yield*/, blogs_api_helper_1.default.blogsInDB()];
                case 2:
                    blogsInDb = _a.sent();
                    expect(blogsInDb.length).toBe(blogs_api_helper_1.default.initialBlogs.length + 1);
                    return [2 /*return*/];
            }
        });
    }); });
});
afterAll(function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    switch (_a.label) {
        case 0: return [4 /*yield*/, mongoose_1.default.connection.close()];
        case 1: return [2 /*return*/, _a.sent()];
    }
}); }); });
