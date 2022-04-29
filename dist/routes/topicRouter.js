"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.topicRouter = void 0;
const express_1 = __importDefault(require("express"));
const topicController_1 = require("../controllers/topicController");
const router = express_1.default.Router({ mergeParams: true });
exports.topicRouter = router;
router.post('/', topicController_1.createTopic);
router.get('/:topicId', topicController_1.getTopic);
router.get('/', topicController_1.getTopics);
router.patch('/:topicId', topicController_1.updateTopic);
router.delete('/:topicId', topicController_1.deleteTopic);
//# sourceMappingURL=topicRouter.js.map