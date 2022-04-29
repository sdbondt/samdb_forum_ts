import { Response } from "express";
import asyncHandler from "../errorhandlers/asyncHandler";
import { ExtendedRequest } from "src/types/types";
import { Topic } from "../entities/TopicEntity";
import { Category } from "../entities/CategoryEntity";
import { StatusCodes } from "http-status-codes";
import { Post } from "../entities/PostEntity";
import { Like } from "typeorm";
const { OK, CREATED, BAD_REQUEST } = StatusCodes

export const createPost = asyncHandler(async (req: ExtendedRequest, res: Response) => {
    const { categoryId, topicId } = req.params
    const { content } = req.body
    const topic = await Topic.findOne({ where: { id: parseInt(topicId) } })
    const category = await Category.findOne({ where: { id: parseInt(categoryId) } })
    if (!topic || !category) {
        res.status(BAD_REQUEST).json({
            errorMsg: 'Invalid request'
        })
    } else if (!content) {
        res.status(BAD_REQUEST).json({
            errorMsg: 'Invalid request: no content added.'
        })
    } else if (req.user?.muted) {
        res.status(BAD_REQUEST).json({
            errorMsg: 'Unauthorized'
        })
    } else {
        const newPost = Post.create({
            content,
            user: req.user,
            topic,
            category
        })
        await newPost.save()
        res.status(CREATED).json({
            msg: 'Post created',
            data: {
                post: newPost
            }
        })
    }
})

export const getPost = asyncHandler(async (req: ExtendedRequest, res: Response) => {
    const { postId } = req.params
    const post = await Post.findOne({
        where: { id: parseInt(postId) },
        relations: { user: true, topic: true, category: true, likes: true}
    })
    if (!post) {
        res.status(BAD_REQUEST).json({
            errorMsg: 'No post found'
        })
    } else {
        res.status(OK).json({
            msg: 'Post found',
            data: {
                post
            }
        })
    }
})

export const getPosts = asyncHandler(async (req: ExtendedRequest, res: Response) => {
    const { page, limit, q,  } = req.query
    const queryLimit = parseInt(limit as string) || 4
    const queryPage = parseInt(page as string) || 1
    const querySkip = (queryPage - 1) * queryLimit
    const searchParam = q || ''

    const posts = await Post.find({
        where: {
            content: Like(`%${searchParam}%`)
        },
        take: queryLimit,
        skip: querySkip,
    })
    res.status(OK).json({
        msg: 'Posts found',
        data: {
            posts
        }
    })
})

export const updatePost = asyncHandler(async (req: ExtendedRequest, res: Response) => {
    const { postId } = req.params
    const { content } = req.body
    const post = await Post.findOne({ where: { id: parseInt(postId) } })
    if (!post) {
        res.status(BAD_REQUEST).json({
            errorMsg: 'No post found'
        })
    } else if (!content) {
        res.status(BAD_REQUEST).json({
            errorMsg: 'Invalid request'
        })
    } else if (post.userId !== req.user?.id && req.user?.role !== 'admin') {
        res.status(BAD_REQUEST).json({
            errorMsg: 'Unauthorized'
        })
    } else if (req.user?.muted) {
        res.status(BAD_REQUEST).json({
            errorMsg: 'Unauthorized'
        })
    } else {
        post.content = content
        await post.save()
        res.status(OK).json({
            data: {
                post
            },
            msg: 'Post updated'
        })
    }
})

export const deletePost = asyncHandler(async (req: ExtendedRequest, res: Response) => {
    const { postId } = req.params
    const post = await Post.findOne({ where: { id: parseInt(postId) } })
    
    if (!post) {
        res.status(BAD_REQUEST).json({
            errorMsg: 'No post found'
        })
    } else if (post.userId !== req.user?.id && req.user?.role !== 'admin') {
        console.log('post userId ' + post.userId)
        console.log('req.userid ' + req.user?.id)
        console.log('role'+req.user?.role)
        res.status(BAD_REQUEST).json({
            errorMsg: 'Unauthorized'
        })
    } else {
        await post.remove()
        res.status(OK).json({
            msg: 'Post deleted'
        })
    }
})