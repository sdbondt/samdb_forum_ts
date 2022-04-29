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
exports.validateNewCategory = void 0;
const types_1 = require("../../types/types");
const CategoryEntity_1 = require("../../entities/CategoryEntity");
const validateNewCategory = (name) => __awaiter(void 0, void 0, void 0, function* () {
    const obj = {
        msg: 'New category is valid.',
        valid: true
    };
    const categoryExists = yield CategoryEntity_1.Category.findOne({ where: { name } });
    if (categoryExists) {
        obj.valid = false;
        obj.msg = 'Category already exists';
    }
    if (!Object.values(types_1.SectionCategoryEnum).includes(name)) {
        obj.valid = false;
        obj.msg = 'Category must be one of the specified values.';
    }
    return obj;
});
exports.validateNewCategory = validateNewCategory;
//# sourceMappingURL=newCategoryValidation.js.map