"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRefreshToken = exports.validateLoginAndPassword = void 0;
function validateLoginAndPassword(req, res, next) {
    var _a = req.body, login = _a.login, password = _a.password;
    if (Boolean(login) && Boolean(password))
        next();
    else
        res.status(400).send({ message: 'Login and password are required' });
}
exports.validateLoginAndPassword = validateLoginAndPassword;
function validateRefreshToken(req, res, next) {
    var refresh_token = req.cookies.refresh_token;
    if (Boolean(refresh_token))
        next();
    else
        res.status(401).send({ message: 'Unauthorized' });
}
exports.validateRefreshToken = validateRefreshToken;
