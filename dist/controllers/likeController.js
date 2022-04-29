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
exports.like = void 0;
const asyncHandler_1 = __importDefault(require("../errorhandlers/asyncHandler"));
const PostEntity_1 = require("../entities/PostEntity");
const http_status_codes_1 = require("http-status-codes");
const LikeEntity_1 = require("../entities/LikeEntity");
const { OK, BAD_REQUEST } = http_status_codes_1.StatusCodes;
exports.like = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { postId } = req.params;
    const post = yield PostEntity_1.Post.findOne({
        where: {
            id: parseInt(postId),
        }
    });
    if (!post) {
        res.status(BAD_REQUEST).json({
            errorMsg: 'No post found'
        });
    }
    else {
        const likeExists = yield LikeEntity_1.Like.findOne({
            where: [{ postId: post.id }, { userId: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id }]
        });
        if (likeExists) {
            yield likeExists.remove();
            res.status(OK).json({
                msg: 'Like removed'
            });
        }
        else {
            const like = LikeEntity_1.Like.create({
                post,
                user: req.user
            });
            yield like.save();
            res.status(OK).json({
                msg: 'Like added',
                data: {
                    like
                }
            });
        }
    }
}));
//# sourceMappingURL=likeController.js.map