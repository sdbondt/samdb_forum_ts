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
exports.auth = void 0;
const http_status_codes_1 = require("http-status-codes");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserEntity_1 = require("../entities/UserEntity");
const customError_1 = __importDefault(require("../errorhandlers/customError"));
const { BAD_REQUEST } = http_status_codes_1.StatusCodes;
const auth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !(authHeader === null || authHeader === void 0 ? void 0 : authHeader.startsWith('Bearer '))) {
            throw new customError_1.default('Unauthenticated', BAD_REQUEST);
        }
        const token = authHeader.split(' ')[1];
        const payload = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        if (!payload || !payload.userId) {
            throw new customError_1.default('Unauthenticated', BAD_REQUEST);
        }
        const user = yield UserEntity_1.User.findOne({ where: { id: payload.userId }, select: { username: true, id: true, email: true, role: true, muted: true } });
        if (!user) {
            throw new customError_1.default('Unauthenticated', BAD_REQUEST);
        }
        else {
            req["user"] = user;
            next();
        }
    }
    catch (e) {
        throw new customError_1.default('Unauthenticated', BAD_REQUEST);
    }
});
exports.auth = auth;
//# sourceMappingURL=authMiddleware.js.map