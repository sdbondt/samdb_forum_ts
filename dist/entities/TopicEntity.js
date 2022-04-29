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
exports.Topic = void 0;
const typeorm_1 = require("typeorm");
const CategoryEntity_1 = require("./CategoryEntity");
const PostEntity_1 = require("./PostEntity");
const UserEntity_1 = require("./UserEntity");
let Topic = class Topic extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Topic.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: '50',
        unique: true
    }),
    __metadata("design:type", String)
], Topic.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Topic.prototype, "firstPost", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => CategoryEntity_1.Category, category => category.topics, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({
        name: 'categoryId'
    }),
    __metadata("design:type", CategoryEntity_1.Category)
], Topic.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'categoryId'
    }),
    __metadata("design:type", Number)
], Topic.prototype, "categoryId", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => PostEntity_1.Post, post => post.topic),
    __metadata("design:type", Array)
], Topic.prototype, "posts", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => UserEntity_1.User, user => user.topics, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({
        name: 'userId'
    }),
    __metadata("design:type", UserEntity_1.User)
], Topic.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'userId'
    }),
    __metadata("design:type", Number)
], Topic.prototype, "userId", void 0);
Topic = __decorate([
    (0, typeorm_1.Entity)('topic')
], Topic);
exports.Topic = Topic;
//# sourceMappingURL=TopicEntity.js.map