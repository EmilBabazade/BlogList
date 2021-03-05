"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.totalLikes = exports.dummy = void 0;
function dummy(blogs) {
    return 1;
}
exports.dummy = dummy;
function totalLikes(blogs) {
    return blogs.map(function (b) { return b.likes; }).reduce(function (a, b) { return a + b; }, 0);
}
exports.totalLikes = totalLikes;
