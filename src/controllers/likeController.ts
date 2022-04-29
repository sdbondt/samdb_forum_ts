import asyncHandler from "../errorhandlers/asyncHandler";
import { Response, } from "express";
import { Post } from "../entities/PostEntity";
import { StatusCodes } from "http-status-codes";
import { Like } from "../entities/LikeEntity";
import { ExtendedRequest } from "src/types/types";
const { OK, BAD_REQUEST } = StatusCodes

export const like = asyncHandler(async (req: ExtendedRequest, res: Response) => {
    const { postId } = req.params
    const post = await Post.findOne({
        where: {
            id: parseInt(postId),
        }
    })
    
    if (!post) {
        res.status(BAD_REQUEST).json({
            errorMsg: 'No post found'
        })
    } else {
        const likeExists = await Like.findOne({
            where: [{ postId: post.id }, { userId: req.user?.id }]
        })
        if (likeExists) {
            await likeExists.remove()
            res.status(OK).json({
                msg: 'Like removed'
            })
        } else {
            const like = Like.create({
                post,
                user: req.user
            })
            await like.save()
            res.status(OK).json({
                msg: 'Like added',
                data: {
                    like
                }
            })
        }
    }
})