"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRouter = void 0;
const express_1 = __importDefault(require("express"));
const authorizeMiddleware_1 = require("../middleware/authorizeMiddleware");
const categoryController_1 = require("../controllers/categoryController");
const topicRouter_1 = require("./topicRouter");
const postRouter_1 = require("./postRouter");
const router = express_1.default.Router();
exports.categoryRouter = router;
router.use('/:categoryId/topics/:topicId', postRouter_1.postRouter);
router.use('/:categoryId/topics', topicRouter_1.topicRouter);
router.post('/', authorizeMiddleware_1.authorize, categoryController_1.createCategory);
router.get('/:categoryId', categoryController_1.getCategory);
router.get('/', categoryController_1.getCategories);
router.delete('/:categoryId', authorizeMiddleware_1.authorize, categoryController_1.deleteCategory);
//# sourceMappingURL=categoryRouter.js.map