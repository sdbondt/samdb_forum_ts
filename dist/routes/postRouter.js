"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRouter = void 0;
const express_1 = __importDefault(require("express"));
const postControllers_1 = require("../controllers/postControllers");
const likeRouter_1 = require("./likeRouter");
const router = express_1.default.Router({ mergeParams: true });
exports.postRouter = router;
router.use('/:postId/like', likeRouter_1.likeRouter);
router.post('/', postControllers_1.createPost);
router.get('/:postId', postControllers_1.getPost);
router.get('/', postControllers_1.getPosts);
router.delete('/:postId', postControllers_1.deletePost);
router.patch('/:postId', postControllers_1.updatePost);
//# sourceMappingURL=postRouter.js.map