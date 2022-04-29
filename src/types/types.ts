import { Request, Response, NextFunction } from 'express'
import { JwtPayload } from 'jsonwebtoken'
import { Topic } from '../entities/TopicEntity'
import { User } from '../entities/UserEntity'
export type AsyncRequestHandler = (req: Request, res: Response, next: NextFunction) => Promise<any>

export enum SectionCategoryEnum {
    MUSIC = 'music',
    SPORTS = 'sports',
    COMEDY = 'comedy',
    POLITICS = 'politics',
    MOVIES = 'movies',
    TV = 'tv',
    NEWS = 'news'
}

export enum UserRolesEnum {
    ADMIN = 'admin',
    USER = 'user'
}

export interface ReturnValidationInterface {
    msg: string,
    valid: boolean,
}

export interface UpdateUserValidationInterface extends ReturnValidationInterface {
    user: User
}

export interface UpdateTopicValidationInterface extends ReturnValidationInterface {
    topic: Topic
}

export interface UserUpdateInterface {
    email?: string,
    password?: string,
    username?: string
}

export interface ExtendedJwtBody extends JwtPayload {
    userId?: number,
    username?: string
}

export interface ExtendedRequest extends Request {
    user?: User
}
