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
exports.createData = void 0;
const CategoryEntity_1 = require("../entities/CategoryEntity");
const UserEntity_1 = require("../entities/UserEntity");
const auth_1 = require("../utils/auth/auth");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const categories = ['music', 'sports', 'comedy', 'politics', 'movies', 'tv', 'news'];
const createData = () => __awaiter(void 0, void 0, void 0, function* () {
    for (let i = 0; i < categories.length; i++) {
        const category = CategoryEntity_1.Category.create({
            name: categories[i]
        });
        yield category.save();
    }
    const hashedAdminPw = yield (0, auth_1.hashPW)(process.env.ADMIN_PASSWORD);
    const admin = UserEntity_1.User.create({
        username: process.env.ADMIN_USERNAME,
        password: hashedAdminPw,
        email: process.env.ADMIN_EMAIL,
        role: 'admin'
    });
    yield admin.save();
    console.log('created data');
});
exports.createData = createData;
//# sourceMappingURL=createData.js.map