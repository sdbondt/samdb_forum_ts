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
exports.login = exports.signup = void 0;
const http_status_codes_1 = require("http-status-codes");
const UserEntity_1 = require("../entities/UserEntity");
const asyncHandler_1 = __importDefault(require("../errorhandlers/asyncHandler"));
const auth_1 = require("../utils/auth/auth");
const newUserValidation_1 = require("../utils/validation/newUserValidation");
const auth_2 = require("../utils/auth/auth");
const dotenv_1 = __importDefault(require("dotenv"));
const { OK, CREATED, BAD_REQUEST } = http_status_codes_1.StatusCodes;
dotenv_1.default.config();
exports.signup = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, confirmPassword, email } = req.body;
    const { valid, msg } = yield (0, newUserValidation_1.validateNewUser)(email, password, confirmPassword, username);
    if (!valid) {
        res.status(BAD_REQUEST).json({
            errorMsg: msg
        });
    }
    else {
        const hashedPw = yield (0, auth_1.hashPW)(password);
        const role = email === process.env.ADMIN_EMAIL ? 'admin' : 'user';
        const user = UserEntity_1.User.create({
            password: hashedPw,
            username,
            email,
            role,
        });
        yield user.save();
        const token = yield (0, auth_2.getJWT)(user);
        res.status(CREATED).json({
            msg: 'User created',
            data: {
                token,
                user
            }
        });
    }
}));
exports.login = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { password, email } = req.body;
    if (!password || !email) {
        return res.status(BAD_REQUEST).json({
            errorMsg: 'Invalid request.'
        });
    }
    const user = yield UserEntity_1.User.findOne({ where: { email } });
    if (!user) {
        return res.status(BAD_REQUEST).json({
            errorMsg: 'Invalid request.'
        });
    }
    else {
        const isValid = yield (0, auth_1.comparePW)(password, user);
        if (!isValid) {
            return res.status(BAD_REQUEST).json({
                errorMsg: 'Invalid credentials.'
            });
        }
        else {
            const token = yield (0, auth_2.getJWT)(user);
            return res.status(OK).json({
                msg: 'User logged in.',
                data: {
                    user,
                    token,
                }
            });
        }
    }
}));
//# sourceMappingURL=authController.js.map