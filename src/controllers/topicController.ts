import { Response } from "express";
import { StatusCodes } from "http-status-codes";
import { validateNewTopic } from "../utils/validation/newTopicValidation";
import { Category } from "../entities/CategoryEntity";
import asyncHandler from "../errorhandlers/asyncHandler";
import { ExtendedRequest } from "../types/types";
import { Topic } from "../entities/TopicEntity";
import { validateUpdateTopic } from "../utils/validation/updateTopicValidation";
import { Like } from "typeorm";
const { OK, CREATED, BAD_REQUEST } = StatusCodes


export const createTopic = asyncHandler(async (req: ExtendedRequest, res: Response) => {
    const { categoryId } = req.params
    const { title, firstPost } = req.body

    const category = await Category.findOne({ where: { id: parseInt(categoryId) }})
    if (!category) {
        res.status(BAD_REQUEST).json({
            errorMsg: 'No category found'
        })
    } else if (req.user?.muted) {
        res.status(BAD_REQUEST).json({
            errorMsg: 'Not authorized'
        })
    } else {
        const topicValidation = await validateNewTopic(title, firstPost)
        const { valid, msg } = topicValidation
        if (!valid) {
            res.status(BAD_REQUEST).json({
                errorMsg: msg
            })
        } else {
            const newTopic = Topic.create({
                title,
                firstPost,
                user: req.user,
                category,
            })
            await newTopic.save()
            res.status(CREATED).json({
                msg: 'Topic created',
                data: {
                    topic: newTopic
                }
            })
        }
    }
})

export const getTopics = asyncHandler(async (req: ExtendedRequest, res: Response) => {
    const { page, limit, q, direction } = req.query
    const queryLimit = parseInt(limit as string) || 4
    const queryPage = parseInt(page as string) || 1
    const querySkip = (queryPage - 1) * queryLimit
    const queryDirection = direction === 'ASC'? 'ASC':'DESC'
    const searchParam = q || ''

    const topics = await Topic.find({
        where: [
            { title: Like(`%${searchParam}%`) },
            { firstPost: Like(`%${searchParam}%`)},
        ],
        take: queryLimit,
        skip: querySkip,
        order: {
            title: queryDirection
        }
    })
    res.status(OK).json({
        msg: 'Topics found',
        data: {
             topics
        }
    })
})

export const getTopic = asyncHandler(async (req: ExtendedRequest, res: Response) => {
    const { topicId } = req.params
    const topic = await Topic.findOne({
        where: { id: parseInt(topicId) },
        relations: {
            posts: true,
            user: true
        }
    })
    if (!topic) {
        res.status(BAD_REQUEST).json({
            errorMsg: 'No topic found'
        })
    } else {
        res.status(OK).json({
            msg: 'Topic found',
            data: {
                topic
            }
        })
    }
})

export const updateTopic = asyncHandler(async (req: ExtendedRequest, res: Response) => {
    const { title, firstPost } = req.body
    const { topicId } = req.params
    const updateTopic = await Topic.findOne({ where: { id: parseInt(topicId) }})
    if (!updateTopic) {
        res.status(BAD_REQUEST).json({
            errorMsg: 'No topic found'
        })
    } else if(updateTopic.userId !== req.user?.id && req.user?.role !== 'admin') {
        res.status(BAD_REQUEST).json({
            errorMsg: 'Unauthorized'
        })
    } else if (req.user.muted) {
        res.status(BAD_REQUEST).json({
            errorMsg: 'Unauthorized'
        })
    } else {
        const updateValidation = await validateUpdateTopic(title, firstPost, updateTopic)
        const { valid, msg, topic } = updateValidation
        if (!valid) {
            res.status(BAD_REQUEST).json({
                errorMsg: msg
            })
        } else {
            await topic.save()
            res.status(OK).json({
                msg: 'Topic updated',
                data: {
                    topic
                }
            })
        }
    }
})

export const deleteTopic = asyncHandler(async (req: ExtendedRequest, res: Response) => {
    const { topicId } = req.params
    const topic = await Topic.findOne({ where: { id: parseInt(topicId) } })
    if (!topic) {
        res.status(BAD_REQUEST).json({
            errorMsg: 'No topic found'
        })
    } else if (topic.userId !== req.user?.id && req.user?.role !== 'admin') {
        res.status(BAD_REQUEST).json({
            errorMsg: 'Not authorized to perfom this action'
        })
    } else {
        await topic.remove()
        res.status(OK).json({
            msg: 'Topic deleted'
        })
    }
})