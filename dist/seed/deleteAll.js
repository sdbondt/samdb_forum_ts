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
exports.deleteAll = void 0;
const PostEntity_1 = require("../entities/PostEntity");
const UserEntity_1 = require("../entities/UserEntity");
const CategoryEntity_1 = require("../entities/CategoryEntity");
const TopicEntity_1 = require("../entities/TopicEntity");
const LikeEntity_1 = require("../entities/LikeEntity");
const deleteAll = () => __awaiter(void 0, void 0, void 0, function* () {
    yield CategoryEntity_1.Category.query('DELETE FROM "category";');
    yield UserEntity_1.User.query('DELETE FROM "user";');
    yield PostEntity_1.Post.query('DELETE FROM "post";');
    yield TopicEntity_1.Topic.query('DELETE FROM "topic";');
    yield LikeEntity_1.Like.query('DELETE FROM "like"');
    console.log('deleted data');
});
exports.deleteAll = deleteAll;
//# sourceMappingURL=deleteAll.js.map