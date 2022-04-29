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
exports.deletePost = exports.updatePost = exports.getPosts = exports.getPost = exports.createPost = void 0;
const asyncHandler_1 = __importDefault(require("../errorhandlers/asyncHandler"));
const TopicEntity_1 = require("../entities/TopicEntity");
const CategoryEntity_1 = require("../entities/CategoryEntity");
const http_status_codes_1 = require("http-status-codes");
const PostEntity_1 = require("../entities/PostEntity");
const typeorm_1 = require("typeorm");
const { OK, CREATED, BAD_REQUEST } = http_status_codes_1.StatusCodes;
exports.createPost = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { categoryId, topicId } = req.params;
    const { content } = req.body;
    const topic = yield TopicEntity_1.Topic.findOne({ where: { id: parseInt(topicId) } });
    const category = yield CategoryEntity_1.Category.findOne({ where: { id: parseInt(categoryId) } });
    if (!topic || !category) {
        res.status(BAD_REQUEST).json({
            errorMsg: 'Invalid request'
        });
    }
    else if (!content) {
        res.status(BAD_REQUEST).json({
            errorMsg: 'Invalid request: no content added.'
        });
    }
    else if ((_a = req.user) === null || _a === void 0 ? void 0 : _a.muted) {
        res.status(BAD_REQUEST).json({
            errorMsg: 'Unauthorized'
        });
    }
    else {
        const newPost = PostEntity_1.Post.create({
            content,
            user: req.user,
            topic,
            category
        });
        yield newPost.save();
        res.status(CREATED).json({
            msg: 'Post created',
            data: {
                post: newPost
            }
        });
    }
}));
exports.getPost = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { postId } = req.params;
    const post = yield PostEntity_1.Post.findOne({
        where: { id: parseInt(postId) },
        relations: { user: true, topic: true, category: true, likes: true }
    });
    if (!post) {
        res.status(BAD_REQUEST).json({
            errorMsg: 'No post found'
        });
    }
    else {
        res.status(OK).json({
            msg: 'Post found',
            data: {
                post
            }
        });
    }
}));
exports.getPosts = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, q, } = req.query;
    const queryLimit = parseInt(limit) || 4;
    const queryPage = parseInt(page) || 1;
    const querySkip = (queryPage - 1) * queryLimit;
    const searchParam = q || '';
    const posts = yield PostEntity_1.Post.find({
        where: {
            content: (0, typeorm_1.Like)(`%${searchParam}%`)
        },
        take: queryLimit,
        skip: querySkip,
    });
    res.status(OK).json({
        msg: 'Posts found',
        data: {
            posts
        }
    });
}));
exports.updatePost = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c, _d;
    const { postId } = req.params;
    const { content } = req.body;
    const post = yield PostEntity_1.Post.findOne({ where: { id: parseInt(postId) } });
    if (!post) {
        res.status(BAD_REQUEST).json({
            errorMsg: 'No post found'
        });
    }
    else if (!content) {
        res.status(BAD_REQUEST).json({
            errorMsg: 'Invalid request'
        });
    }
    else if (post.userId !== ((_b = req.user) === null || _b === void 0 ? void 0 : _b.id) && ((_c = req.user) === null || _c === void 0 ? void 0 : _c.role) !== 'admin') {
        res.status(BAD_REQUEST).json({
            errorMsg: 'Unauthorized'
        });
    }
    else if ((_d = req.user) === null || _d === void 0 ? void 0 : _d.muted) {
        res.status(BAD_REQUEST).json({
            errorMsg: 'Unauthorized'
        });
    }
    else {
        post.content = content;
        yield post.save();
        res.status(OK).json({
            data: {
                post
            },
            msg: 'Post updated'
        });
    }
}));
exports.deletePost = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _e, _f, _g, _h;
    const { postId } = req.params;
    const post = yield PostEntity_1.Post.findOne({ where: { id: parseInt(postId) } });
    if (!post) {
        res.status(BAD_REQUEST).json({
            errorMsg: 'No post found'
        });
    }
    else if (post.userId !== ((_e = req.user) === null || _e === void 0 ? void 0 : _e.id) && ((_f = req.user) === null || _f === void 0 ? void 0 : _f.role) !== 'admin') {
        console.log('post userId ' + post.userId);
        console.log('req.userid ' + ((_g = req.user) === null || _g === void 0 ? void 0 : _g.id));
        console.log('role' + ((_h = req.user) === null || _h === void 0 ? void 0 : _h.role));
        res.status(BAD_REQUEST).json({
            errorMsg: 'Unauthorized'
        });
    }
    else {
        yield post.remove();
        res.status(OK).json({
            msg: 'Post deleted'
        });
    }
}));
//# sourceMappingURL=postControllers.js.map