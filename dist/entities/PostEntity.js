"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const typeorm_1 = require("typeorm");
const CategoryEntity_1 = require("./CategoryEntity");
const LikeEntity_1 = require("./LikeEntity");
const TopicEntity_1 = require("./TopicEntity");
const UserEntity_1 = require("./UserEntity");
let Post = class Post extends typeorm_1.BaseEntity {
    get likeCount() {
        return this.likes.length || 0;
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Post.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Post.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => CategoryEntity_1.Category, category => category.posts, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({
        name: 'categoryId'
    }),
    __metadata("design:type", CategoryEntity_1.Category)
], Post.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'categoryId'
    }),
    __metadata("design:type", Number)
], Post.prototype, "categoryId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => TopicEntity_1.Topic, topic => topic.posts, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({
        name: 'topicId'
    }),
    __metadata("design:type", TopicEntity_1.Topic)
], Post.prototype, "topic", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'topicId'
    }),
    __metadata("design:type", Number)
], Post.prototype, "topicId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => UserEntity_1.User, user => user.posts, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({
        name: 'userId'
    }),
    __metadata("design:type", UserEntity_1.User)
], Post.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'userId'
    }),
    __metadata("design:type", Number)
], Post.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => LikeEntity_1.Like, like => like.post),
    __metadata("design:type", Array)
], Post.prototype, "likes", void 0);
Post = __decorate([
    (0, typeorm_1.Entity)('post')
], Post);
exports.Post = Post;
//# sourceMappingURL=PostEntity.js.map