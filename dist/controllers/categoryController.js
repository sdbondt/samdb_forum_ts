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
exports.deleteCategory = exports.getCategories = exports.getCategory = exports.createCategory = void 0;
const http_status_codes_1 = require("http-status-codes");
const CategoryEntity_1 = require("../entities/CategoryEntity");
const asyncHandler_1 = __importDefault(require("../errorhandlers/asyncHandler"));
const newCategoryValidation_1 = require("../utils/validation/newCategoryValidation");
const { OK, BAD_REQUEST, CREATED } = http_status_codes_1.StatusCodes;
exports.createCategory = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    const { valid, msg } = yield (0, newCategoryValidation_1.validateNewCategory)(name);
    if (!valid) {
        res.status(BAD_REQUEST).json({
            errorMsg: msg
        });
    }
    else {
        const newCategory = CategoryEntity_1.Category.create({
            name,
        });
        yield newCategory.save();
        res.status(CREATED).json({
            msg: 'Category got created.',
            data: {
                category: newCategory
            }
        });
    }
}));
exports.getCategory = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { categoryId } = req.params;
    const category = yield CategoryEntity_1.Category.findOne({
        where: {
            id: parseInt(categoryId),
        },
        relations: {
            topics: true,
            posts: true,
        }
    });
    if (!category) {
        res.status(BAD_REQUEST).json({
            errorMsg: 'No category found'
        });
    }
    else {
        res.status(OK).json({
            data: {
                category
            },
            msg: 'Category found.'
        });
    }
}));
exports.getCategories = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const categories = yield CategoryEntity_1.Category.find();
    res.status(OK).json({
        data: {
            categories
        },
        msg: 'Categories found.'
    });
}));
exports.deleteCategory = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { categoryId } = req.params;
    const category = yield CategoryEntity_1.Category.findOne({ where: { id: parseInt(categoryId) } });
    if (!category) {
        res.status(BAD_REQUEST).json({
            errorMsg: 'No category found'
        });
    }
    else {
        yield category.remove();
        res.status(OK).json({
            msg: 'Category deleted'
        });
    }
}));
//# sourceMappingURL=categoryController.js.map