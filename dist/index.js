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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const typeorm_1 = require("typeorm");
const notFoundHandler_1 = __importDefault(require("./errorhandlers/notFoundHandler"));
const errorHandler_1 = __importDefault(require("./errorhandlers/errorHandler"));
const LikeEntity_1 = require("./entities/LikeEntity");
const UserEntity_1 = require("./entities/UserEntity");
const TopicEntity_1 = require("./entities/TopicEntity");
const CategoryEntity_1 = require("./entities/CategoryEntity");
const PostEntity_1 = require("./entities/PostEntity");
const userRouter_1 = require("./routes/userRouter");
const postRouter_1 = require("./routes/postRouter");
const likeRouter_1 = require("./routes/likeRouter");
const categoryRouter_1 = require("./routes/categoryRouter");
const topicRouter_1 = require("./routes/topicRouter");
const authRouter_1 = require("./routes/authRouter");
const authMiddleware_1 = require("./middleware/authMiddleware");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = parseInt(process.env.PORT) || 5000;
const main = () => __awaiter(void 0, void 0, void 0, function* () {
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
        app.use(express_1.default.json());
        app.use((0, cors_1.default)());
        app.use((0, morgan_1.default)('dev'));
        app.use('/users', authMiddleware_1.auth, userRouter_1.userRouter);
        app.use('/posts', authMiddleware_1.auth, postRouter_1.postRouter);
        app.use('/likes', authMiddleware_1.auth, likeRouter_1.likeRouter);
        app.use('/categories', authMiddleware_1.auth, categoryRouter_1.categoryRouter);
        app.use('/topics', authMiddleware_1.auth, topicRouter_1.topicRouter);
        app.use('/auth', authRouter_1.authRouter);
        app.use(notFoundHandler_1.default);
        app.use(errorHandler_1.default);
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}.`);
        });
    }
    catch (e) {
        console.error(e);
        throw new Error('Unable to connect to the database.');
    }
});
main();
//# sourceMappingURL=index.js.map