import { NextFunction,  Response } from "express";
import { StatusCodes } from "http-status-codes";
import jwt from 'jsonwebtoken'
import { ExtendedJwtBody, ExtendedRequest } from "../types/types";
import { User } from "../entities/UserEntity";
import CustomError from "../errorhandlers/customError";
const { BAD_REQUEST } = StatusCodes

export const auth = async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization
        if (!authHeader || !authHeader?.startsWith('Bearer ')) {
           throw new CustomError('Unauthenticated', BAD_REQUEST)
        }
        const token = authHeader.split(' ')[1]
        const payload = jwt.verify(token, process.env.JWT_SECRET as string) as ExtendedJwtBody
        if (!payload || !payload.userId) {
            throw new CustomError('Unauthenticated', BAD_REQUEST)
        }
        const user: User | null = await User.findOne({ where: { id: payload.userId }, select: { username: true, id: true, email: true, role: true, muted: true }})
        if (!user) {
            throw new CustomError('Unauthenticated', BAD_REQUEST)
        } else {
            req["user"] = user
            next()
        }
    } catch (e) {
        throw new CustomError('Unauthenticated', BAD_REQUEST)
    }
}