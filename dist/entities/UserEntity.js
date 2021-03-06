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
exports.User = void 0;
const types_1 = require("../types/types");
const typeorm_1 = require("typeorm");
const LikeEntity_1 = require("./LikeEntity");
const PostEntity_1 = require("./PostEntity");
const TopicEntity_1 = require("./TopicEntity");
let User = class User extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)({
        unique: true
    }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({
        enum: types_1.UserRolesEnum,
    }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: false
    }),
    __metadata("design:type", Boolean)
], User.prototype, "muted", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => PostEntity_1.Post, post => post.user),
    __metadata("design:type", Array)
], User.prototype, "posts", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => TopicEntity_1.Topic, topic => topic.user),
    __metadata("design:type", Array)
], User.prototype, "topics", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => LikeEntity_1.Like, like => like.user),
    __metadata("design:type", Array)
], User.prototype, "likes", void 0);
User = __decorate([
    (0, typeorm_1.Entity)('user')
], User);
exports.User = User;
//# sourceMappingURL=UserEntity.js.map