import { NextFunction, Response } from "express";
import { StatusCodes } from "http-status-codes";
import CustomError from "../errorhandlers/customError";
import { ExtendedRequest } from "../types/types"
const { BAD_REQUEST } = StatusCodes

export const authorize = (req: ExtendedRequest, res: Response, next: NextFunction) => {
    if (req.user?.role !== 'admin') {
        throw new CustomError('Not authorized', BAD_REQUEST)
    } else {
        next()
    }
}