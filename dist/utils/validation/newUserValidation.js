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
exports.validateNewUser = void 0;
const UserEntity_1 = require("../../entities/UserEntity");
const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
const validateNewUser = (email, password, confirmPassword, username) => __awaiter(void 0, void 0, void 0, function* () {
    const obj = {
        msg: 'New category is valid.',
        valid: true
    };
    if (!username) {
        obj.msg = 'You must add a username';
        obj.valid = false;
    }
    if (!password.match(passwordRegex)) {
        obj.msg = 'Password must be at least 8 characters long, contain a number and a upper and lower case character.';
        obj.valid = false;
    }
    if (password !== confirmPassword) {
        obj.msg = 'Password don\'t match.',
            obj.valid = false;
    }
    if (!email.match(emailRegex)) {
        obj.valid = false;
        obj.msg = 'Invalid email address.';
    }
    const userExists = yield UserEntity_1.User.findOne({ where: { email } });
    if (userExists) {
        obj.valid = false;
        obj.msg = 'Email address already in use.';
    }
    return obj;
});
exports.validateNewUser = validateNewUser;
//# sourceMappingURL=newUserValidation.js.map