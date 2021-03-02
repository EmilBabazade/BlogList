"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function info() {
    var params = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        params[_i] = arguments[_i];
    }
    console.log.apply(console, params);
}
function error() {
    var params = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        params[_i] = arguments[_i];
    }
    console.error.apply(console, params);
}
exports.default = {
    info: info, error: error
};
