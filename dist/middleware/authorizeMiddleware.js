"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = void 0;
const http_status_codes_1 = require("http-status-codes");
const customError_1 = __importDefault(require("../errorhandlers/customError"));
const { BAD_REQUEST } = http_status_codes_1.StatusCodes;
const authorize = (req, res, next) => {
    var _a;
    if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.role) !== 'admin') {
        throw new customError_1.default('Not authorized', BAD_REQUEST);
    }
    else {
        next();
    }
};
exports.authorize = authorize;
//# sourceMappingURL=authorizeMiddleware.js.map