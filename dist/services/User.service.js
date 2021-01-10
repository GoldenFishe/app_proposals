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
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../utils/db");
class UserService {
    selectByLoginAndPassword(login, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const [user] = yield db_1.query(`SELECT * FROM users WHERE login='${login}' AND password='${password}'`);
            return user;
        });
    }
    add(login, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const [user] = yield db_1.query(`INSERT INTO users (login, password) VALUES ('${login}', '${password}') RETURNING *`);
            return user;
        });
    }
}
exports.default = new UserService();
