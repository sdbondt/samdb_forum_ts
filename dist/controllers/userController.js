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
exports.muteUser = exports.updateUser = exports.deleteUser = exports.getUser = exports.getUsers = void 0;
const asyncHandler_1 = __importDefault(require("../errorhandlers/asyncHandler"));
const UserEntity_1 = require("../entities/UserEntity");
const http_status_codes_1 = require("http-status-codes");
const updateUserValidation_1 = require("../utils/validation/updateUserValidation");
const typeorm_1 = require("typeorm");
const { OK, BAD_REQUEST } = http_status_codes_1.StatusCodes;
exports.getUsers = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, q, orderBy, direction } = req.query;
    const queryLimit = parseInt(limit) || 4;
    const queryPage = parseInt(page) || 1;
    const querySkip = (queryPage - 1) * queryLimit;
    const queryOrder = orderBy === 'email' ? 'email' : 'username';
    const queryDirection = direction === 'ASC' ? 'ASC' : 'DESC';
    const searchParam = q || '';
    const users = yield UserEntity_1.User.find({
        where: [
            { email: (0, typeorm_1.Like)(`%${searchParam}%`) },
            { username: (0, typeorm_1.Like)(`${searchParam}`) }
        ],
        take: queryLimit,
        skip: querySkip,
        order: {
            [queryOrder]: queryDirection
        }
    });
    res.status(OK).json({
        msg: 'Found users',
        data: {
            users
        }
    });
}));
exports.getUser = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const user = yield UserEntity_1.User.findOne({ where: { id: parseInt(userId) }, select: { username: true, id: true, email: true, role: true, muted: true } });
    if (!user) {
        res.status(BAD_REQUEST).json({
            errorMsg: 'No user found'
        });
    }
    else {
        res.status(OK).json({
            msg: 'User found',
            data: {
                user
            }
        });
    }
}));
exports.deleteUser = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { userId } = req.params;
    const user = yield UserEntity_1.User.findOne({ where: { id: parseInt(userId) } });
    if (!user) {
        res.status(BAD_REQUEST).json({
            errorMsg: 'No user found'
        });
    }
    else if (parseInt(userId) !== ((_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.id) && ((_b = req === null || req === void 0 ? void 0 : req.user) === null || _b === void 0 ? void 0 : _b.role) !== 'admin') {
        res.status(BAD_REQUEST).json({
            errorMsg: 'Not authorized'
        });
    }
    else {
        yield user.remove();
        res.status(OK).json({
            msg: 'User got deleted'
        });
    }
}));
exports.updateUser = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d;
    const { userId } = req.params;
    const { username, password, email } = req.body;
    const updateUser = yield UserEntity_1.User.findOne({ where: { id: parseInt(userId) } });
    if (!updateUser) {
        res.status(BAD_REQUEST).json({
            errorMsg: 'No user found.'
        });
    }
    else if (parseInt(userId) !== ((_c = req.user) === null || _c === void 0 ? void 0 : _c.id) && ((_d = req.user) === null || _d === void 0 ? void 0 : _d.role) !== 'admin') {
        res.status(BAD_REQUEST).json({
            errorMsg: 'Not authorized'
        });
    }
    else {
        const updateValidation = yield (0, updateUserValidation_1.validateUserUpdate)(email, password, username, updateUser);
        const { msg, valid, user } = updateValidation;
        if (!valid) {
            res.status(BAD_REQUEST).json({
                errorMsg: msg
            });
        }
        else {
            yield user.save();
            res.status(OK).json({
                msg: 'User updated',
                data: {
                    user
                }
            });
        }
    }
}));
exports.muteUser = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const user = yield UserEntity_1.User.findOne({ where: { id: parseInt(userId) } });
    if (!user) {
        res.status(BAD_REQUEST).json({
            errorMsg: 'No user found'
        });
    }
    else {
        user.muted = !user.muted;
        const msg = user.muted ? 'User muted' : 'User unmuted';
        yield user.save();
        res.status(OK).json({
            msg,
            data: {
                user
            }
        });
    }
}));
//# sourceMappingURL=userController.js.map