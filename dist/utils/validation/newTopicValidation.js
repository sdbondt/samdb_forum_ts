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
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateNewTopic = void 0;
const TopicEntity_1 = require("../../entities/TopicEntity");
const validateNewTopic = (title, firstPost) => __awaiter(void 0, void 0, void 0, function* () {
    const obj = {
        msg: 'New category is valid.',
        valid: true
    };
    const titleExists = yield TopicEntity_1.Topic.findOne({ where: { title } });
    if (!title || !firstPost) {
        obj.valid = false;
        obj.msg = 'Invalid request, title and first post must be submitted';
    }
    if (title.length > 50) {
        obj.valid = false;
        obj.msg = 'Invalid request, title cannot be longer than 50 characters';
    }
    if (titleExists) {
        obj.valid = false;
        obj.msg = 'Invalid request, topic with that title already exists';
    }
    return obj;
});
exports.validateNewTopic = validateNewTopic;
//# sourceMappingURL=newTopicValidation.js.map