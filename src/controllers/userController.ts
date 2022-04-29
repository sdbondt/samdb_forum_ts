import { Response } from "express";
import { ExtendedRequest } from "../types/types";
import asyncHandler from "../errorhandlers/asyncHandler";
import { User } from "../entities/UserEntity";
import { StatusCodes } from "http-status-codes";
import { validateUserUpdate } from "../utils/validation/updateUserValidation";
import { Like } from "typeorm";
const { OK, BAD_REQUEST } = StatusCodes

export const getUsers = asyncHandler(async (req: ExtendedRequest, res: Response) => {
    const { page, limit, q, orderBy, direction } = req.query
    const queryLimit = parseInt(limit as string) || 4
    const queryPage = parseInt(page as string) || 1
    const querySkip = (queryPage - 1) * queryLimit
    const queryOrder = orderBy === 'email' ? 'email' : 'username'
    const queryDirection = direction === 'ASC'? 'ASC':'DESC'
    const searchParam = q || ''
    
        const users = await User.find({
            where: [
                { email: Like(`%${searchParam}%`) },
                { username: Like(`${searchParam}`)}
            ],
            take: queryLimit,
            skip: querySkip,
            order: {
                [queryOrder]: queryDirection
            }
        })
        res.status(OK).json({
            msg: 'Found users',
            data: {
                users
            }
        })
    
    
})

export const getUser = asyncHandler(async (req:  ExtendedRequest, res: Response) => {
    const { userId } = req.params
    const user = await User.findOne({ where: { id: parseInt(userId) }, select: { username: true, id: true, email: true, role: true, muted: true }})
    
    if (!user) {
        res.status(BAD_REQUEST).json({
            errorMsg: 'No user found'
        })
    } else {
        res.status(OK).json({
            msg: 'User found',
            data: {
                user
            }
        })
    }
})

export const deleteUser = asyncHandler(async (req:  ExtendedRequest, res: Response) => {
    const { userId } = req.params
    const user = await User.findOne({ where: { id: parseInt(userId) } })
    if (!user) {
        res.status(BAD_REQUEST).json({
            errorMsg: 'No user found'
        })
    } else if (parseInt(userId) !== req?.user?.id && req?.user?.role !== 'admin') {
        res.status(BAD_REQUEST).json({
            errorMsg: 'Not authorized'
        })
    } else {
        await user.remove()
        res.status(OK).json({
            msg: 'User got deleted'
        })
    }
})

export const updateUser = asyncHandler(async (req: ExtendedRequest, res: Response) => {
    const { userId } = req.params
    const { username, password, email } = req.body
    
    const updateUser = await User.findOne({ where: { id: parseInt(userId) } })
    if (!updateUser) {
        res.status(BAD_REQUEST).json({
            errorMsg: 'No user found.'
        })
    } else if (parseInt(userId) !== req.user?.id && req.user?.role !== 'admin') {
        res.status(BAD_REQUEST).json({
            errorMsg: 'Not authorized'
        })
    } else {
        const updateValidation = await validateUserUpdate(email, password, username, updateUser)
        const { msg, valid, user } = updateValidation
        if (!valid) {
            res.status(BAD_REQUEST).json({
            errorMsg: msg
            })
        } else {
            await user.save()
            res.status(OK).json({
                msg: 'User updated',
                data: {
                    user
                }
            })
        }
        }  
})

export const muteUser = asyncHandler(async (req: ExtendedRequest, res: Response) => {
    const { userId } = req.params
    const user = await User.findOne({ where: { id: parseInt(userId) } })
    
    if (!user) {
        res.status(BAD_REQUEST).json({
            errorMsg: 'No user found'
        })
    } else {
        user.muted = !user.muted
        const msg = user.muted ? 'User muted': 'User unmuted'
        await user.save()
        res.status(OK).json({
            msg,
            data: {
                user
            }
        })
    }
})