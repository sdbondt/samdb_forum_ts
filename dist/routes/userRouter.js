"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const authorizeMiddleware_1 = require("../middleware/authorizeMiddleware");
const userController_1 = require("../controllers/userController");
const router = express_1.default.Router();
exports.userRouter = router;
router.post('/:userId/mute', authorizeMiddleware_1.authorize, userController_1.muteUser);
router.get('/:userId', userController_1.getUser);
router.get('/', userController_1.getUsers);
router.patch('/:userId', userController_1.updateUser);
router.delete('/:userId', userController_1.deleteUser);
//# sourceMappingURL=userRouter.js.map