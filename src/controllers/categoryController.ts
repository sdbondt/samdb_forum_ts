import { Response, Request } from "express";
import { StatusCodes } from "http-status-codes";
import { Category } from "../entities/CategoryEntity";
import asyncHandler from "../errorhandlers/asyncHandler";
import { validateNewCategory } from "../utils/validation/newCategoryValidation";
const { OK, BAD_REQUEST, CREATED } = StatusCodes

export const createCategory = asyncHandler(async (req: Request, res: Response) => {
    const { name } = req.body
    const { valid, msg } = await validateNewCategory(name)
    if (!valid) {
        res.status(BAD_REQUEST).json({
            errorMsg: msg
        })
    } else {
        const newCategory = Category.create({
            name,
        })
        await newCategory.save()
        res.status(CREATED).json({
            msg: 'Category got created.',
            data: {
                category: newCategory
            }
        })
    }
    
})

export const getCategory = asyncHandler(async (req: Request, res: Response) => {
    const { categoryId } = req.params
    const category = await Category.findOne({
        where: {
            id: parseInt(categoryId),
        },
        relations: {
            topics: true,
            posts: true,
        }
    })
    
    if (!category) {
        res.status(BAD_REQUEST).json({
            errorMsg:  'No category found'
        })
    } else {
        res.status(OK).json({
            data: {
                category
            },
            msg: 'Category found.'
        })
    }
})

export const getCategories = asyncHandler(async (req: Request, res: Response) => {
    const categories = await Category.find()
    res.status(OK).json({
        data: {
            categories
        },
        msg: 'Categories found.'
    })
})

export const deleteCategory = asyncHandler(async (req: Request, res: Response) => {
    const { categoryId } = req.params
    const category = await Category.findOne({ where: { id: parseInt(categoryId) } })
    if (!category) {
        res.status(BAD_REQUEST).json({
            errorMsg: 'No category found'
        })
    } else {
        await category.remove()
        res.status(OK).json({
            msg: 'Category deleted'
        })
    }
})