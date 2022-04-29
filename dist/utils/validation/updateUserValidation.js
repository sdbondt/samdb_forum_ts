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
exports.validateUserUpdate = void 0;
const UserEntity_1 = require("../../entities/UserEntity");
const auth_1 = require("../auth/auth");
const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
const validateUserUpdate = (email, password, username, user) => __awaiter(void 0, void 0, void 0, function* () {
    const obj = {
        valid: true,
        msg: 'User updated',
        user,
    };
    if (!email && !password && !username) {
        obj.valid = false;
        obj.msg = 'Nothing to update';
    }
    if (email) {
        if (email.match(emailRegex)) {
            const userExists = yield UserEntity_1.User.findOne({ where: { email } });
            if (userExists) {
                obj.valid = false;
                obj.msg = 'Bad request, email address already in use.';
            }
            else {
                user.email = email;
            }
        }
        else {
            obj.valid = false;
            obj.msg = 'Bad request, invalid email';
        }
    }
    if (username) {
        user.username = username;
    }
    if (password) {
        if (!password.match(passwordRegex)) {
            obj.valid = false;
            obj.msg = 'Password must be at least 8 characters long, contain a number and a upper and lower case character.';
        }
        else {
            const hashedPw = yield (0, auth_1.hashPW)(password);
            user.password = hashedPw;
        }
    }
    return obj;
});
exports.validateUserUpdate = validateUserUpdate;
//# sourceMappingURL=updateUserValidation.js.map