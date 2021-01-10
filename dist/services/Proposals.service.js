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
class ProposalsService {
    selectAll() {
        return db_1.query('SELECT * FROM proposals');
    }
    selectById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const [proposal] = yield db_1.query(`SELECT * FROM proposals WHERE id=${id}`);
            return proposal;
        });
    }
    add(title, description, authorId) {
        return __awaiter(this, void 0, void 0, function* () {
            const [proposal] = yield db_1.query(`INSERT INTO proposals (title, description, author_id) VALUES ('${title}', '${description}', ${authorId}) RETURNING *`);
            return proposal;
        });
    }
}
exports.default = new ProposalsService();
