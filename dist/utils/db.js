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
exports.query = void 0;
const pg_1 = require("pg");
const config_1 = require("../config");
const pool = new pg_1.Pool({
    user: config_1.DB_USER,
    host: config_1.DB_HOST,
    database: config_1.DB_NAME,
    password: config_1.DB_PASSWORD,
    port: config_1.DB_PORT
});
const query = (command, params) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const client = yield pool.connect();
        const startTime = Date.now();
        const result = yield client.query(command, params);
        const duration = `${(Date.now() - startTime) / 1000} s`;
        console.log('executed query', { command, duration, rows: result.rowCount });
        client.release();
        return result.rows;
    }
    catch (err) {
        console.error(err.stack);
    }
});
exports.query = query;
