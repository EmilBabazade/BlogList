"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var userSchema = new mongoose_1.default.Schema({
    username: String,
    passwordHash: String,
    blogs: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'Blog'
        }
    ]
});
userSchema.set('toJSON', {
    transform: function (_, returnedObject) {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
        delete returnedObject.passwordHash;
    }
});
