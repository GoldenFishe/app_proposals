"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDataFromEnvironment = void 0;
function getDataFromEnvironment(field, required) {
    if (required === void 0) { required = true; }
    var data = process.env[field];
    if (data === undefined && required) {
        throw new Error(field + " doesn't exist in environment");
    }
    else {
        return data;
    }
}
exports.getDataFromEnvironment = getDataFromEnvironment;
