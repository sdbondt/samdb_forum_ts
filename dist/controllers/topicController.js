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
exports.deleteTopic = exports.updateTopic = exports.getTopic = exports.getTopics = exports.createTopic = void 0;
const http_status_codes_1 = require("http-status-codes");
const newTopicValidation_1 = require("../utils/validation/newTopicValidation");
const CategoryEntity_1 = require("../entities/CategoryEntity");
const asyncHandler_1 = __importDefault(require("../errorhandlers/asyncHandler"));
const TopicEntity_1 = require("../entities/TopicEntity");
const updateTopicValidation_1 = require("../utils/validation/updateTopicValidation");
const typeorm_1 = require("typeorm");
const { OK, CREATED, BAD_REQUEST } = http_status_codes_1.StatusCodes;
exports.createTopic = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { categoryId } = req.params;
    const { title, firstPost } = req.body;
    const category = yield CategoryEntity_1.Category.findOne({ where: { id: parseInt(categoryId) } });
    if (!category) {
        res.status(BAD_REQUEST).json({
            errorMsg: 'No category found'
        });
    }
    else if ((_a = req.user) === null || _a === void 0 ? void 0 : _a.muted) {
        res.status(BAD_REQUEST).json({
            errorMsg: 'Not authorized'
        });
    }
    else {
        const topicValidation = yield (0, newTopicValidation_1.validateNewTopic)(title, firstPost);
        const { valid, msg } = topicValidation;
        if (!valid) {
            res.status(BAD_REQUEST).json({
                errorMsg: msg
            });
        }
        else {
            const newTopic = TopicEntity_1.Topic.create({
                title,
                firstPost,
                user: req.user,
                category,
            });
            yield newTopic.save();
            res.status(CREATED).json({
                msg: 'Topic created',
                data: {
                    topic: newTopic
                }
            });
        }
    }
}));
exports.getTopics = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, q, direction } = req.query;
    const queryLimit = parseInt(limit) || 4;
    const queryPage = parseInt(page) || 1;
    const querySkip = (queryPage - 1) * queryLimit;
    const queryDirection = direction === 'ASC' ? 'ASC' : 'DESC';
    const searchParam = q || '';
    const topics = yield TopicEntity_1.Topic.find({
        where: [
            { title: (0, typeorm_1.Like)(`%${searchParam}%`) },
            { firstPost: (0, typeorm_1.Like)(`%${searchParam}%`) },
        ],
        take: queryLimit,
        skip: querySkip,
        order: {
            title: queryDirection
        }
    });
    res.status(OK).json({
        msg: 'Topics found',
        data: {
            topics
        }
    });
}));
exports.getTopic = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { topicId } = req.params;
    const topic = yield TopicEntity_1.Topic.findOne({
        where: { id: parseInt(topicId) },
        relations: {
            posts: true,
            user: true
        }
    });
    if (!topic) {
        res.status(BAD_REQUEST).json({
            errorMsg: 'No topic found'
        });
    }
    else {
        res.status(OK).json({
            msg: 'Topic found',
            data: {
                topic
            }
        });
    }
}));
exports.updateTopic = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c;
    const { title, firstPost } = req.body;
    const { topicId } = req.params;
    const updateTopic = yield TopicEntity_1.Topic.findOne({ where: { id: parseInt(topicId) } });
    if (!updateTopic) {
        res.status(BAD_REQUEST).json({
            errorMsg: 'No topic found'
        });
    }
    else if (updateTopic.userId !== ((_b = req.user) === null || _b === void 0 ? void 0 : _b.id) && ((_c = req.user) === null || _c === void 0 ? void 0 : _c.role) !== 'admin') {
        res.status(BAD_REQUEST).json({
            errorMsg: 'Unauthorized'
        });
    }
    else if (req.user.muted) {
        res.status(BAD_REQUEST).json({
            errorMsg: 'Unauthorized'
        });
    }
    else {
        const updateValidation = yield (0, updateTopicValidation_1.validateUpdateTopic)(title, firstPost, updateTopic);
        const { valid, msg, topic } = updateValidation;
        if (!valid) {
            res.status(BAD_REQUEST).json({
                errorMsg: msg
            });
        }
        else {
            yield topic.save();
            res.status(OK).json({
                msg: 'Topic updated',
                data: {
                    topic
                }
            });
        }
    }
}));
exports.deleteTopic = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d, _e;
    const { topicId } = req.params;
    const topic = yield TopicEntity_1.Topic.findOne({ where: { id: parseInt(topicId) } });
    if (!topic) {
        res.status(BAD_REQUEST).json({
            errorMsg: 'No topic found'
        });
    }
    else if (topic.userId !== ((_d = req.user) === null || _d === void 0 ? void 0 : _d.id) && ((_e = req.user) === null || _e === void 0 ? void 0 : _e.role) !== 'admin') {
        res.status(BAD_REQUEST).json({
            errorMsg: 'Not authorized to perfom this action'
        });
    }
    else {
        yield topic.remove();
        res.status(OK).json({
            msg: 'Topic deleted'
        });
    }
}));
//# sourceMappingURL=topicController.js.map