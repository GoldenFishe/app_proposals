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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Proposals_service_1 = __importDefault(require("../services/Proposals.service"));
class ProposalsController {
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const proposals = yield Proposals_service_1.default.selectAll();
            res.send(proposals);
        });
    }
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            const proposal = yield Proposals_service_1.default.selectById(id);
            res.send(proposal);
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, description } = req.body;
            const proposal = yield Proposals_service_1.default.add(title, description, 0);
            res.send(proposal);
        });
    }
}
exports.default = new ProposalsController();
