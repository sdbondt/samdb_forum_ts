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
const dotenv_1 = __importDefault(require("dotenv"));
const typeorm_1 = require("typeorm");
const createData_1 = require("./createData");
const deleteAll_1 = require("./deleteAll");
const UserEntity_1 = require("../entities/UserEntity");
const LikeEntity_1 = require("../entities/LikeEntity");
const TopicEntity_1 = require("../entities/TopicEntity");
const CategoryEntity_1 = require("../entities/CategoryEntity");
const PostEntity_1 = require("../entities/PostEntity");
dotenv_1.default.config();
const seed = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, typeorm_1.createConnection)({
            type: 'postgres',
            host: process.env.PG_HOST,
            port: 5432,
            username: process.env.PG_USER,
            password: process.env.PG_PASSWORD,
            database: process.env.PG_DB,
            synchronize: true,
            entities: [UserEntity_1.User, LikeEntity_1.Like, TopicEntity_1.Topic, CategoryEntity_1.Category, PostEntity_1.Post]
        });
        yield (0, deleteAll_1.deleteAll)();
        yield (0, createData_1.createData)();
    }
    catch (e) {
        console.error(e);
        throw new Error('Unable to connect to the database.');
    }
});
seed();
//# sourceMappingURL=seed.js.map