import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { User } from "../entities/UserEntity";
import asyncHandler from "../errorhandlers/asyncHandler";
import { comparePW, hashPW } from "../utils/auth/auth";
import { validateNewUser } from "../utils/validation/newUserValidation";
import { getJWT } from "../utils/auth/auth";
import dotenv from 'dotenv'
const { OK, CREATED, BAD_REQUEST } = StatusCodes
dotenv.config()

export const signup = asyncHandler(async (req: Request, res: Response) => {
    const { username, password, confirmPassword, email } = req.body
    const { valid, msg } = await validateNewUser(email, password, confirmPassword, username)
    if (!valid) {
        res.status(BAD_REQUEST).json({
            errorMsg: msg
        })
    } else {
        const hashedPw = await hashPW(password)
        const role = email === process.env.ADMIN_EMAIL ? 'admin':'user'
        const user = User.create({
            password: hashedPw,
            username,
            email,
            role,
        })
        await user.save()
        const token = await getJWT(user)
        res.status(CREATED).json({
            msg: 'User created',
            data: {
                token,
                user
            }
        })
    }
})

export const login = asyncHandler(async (req: Request, res: Response) => {
    const { password, email } = req.body
    if (!password || !email) {
        return res.status(BAD_REQUEST).json({
            errorMsg: 'Invalid request.'
        })
    }

    const user = await User.findOne({ where: { email } })
    if (!user) {
        return res.status(BAD_REQUEST).json({
            errorMsg: 'Invalid request.'
        })
    } else {
        const isValid = await comparePW(password, user)
        if (!isValid) {
            return res.status(BAD_REQUEST).json({
                errorMsg: 'Invalid credentials.'
            })
        } else {
            const token = await getJWT(user)
            return res.status(OK).json({
                msg: 'User logged in.',
                data: {
                    user,
                    token,
                }
            })
        }
    }
})