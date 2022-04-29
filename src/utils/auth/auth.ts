import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
import { User } from '../../entities/UserEntity'
dotenv.config()

export const hashPW = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10);
    const hashedPW = await bcrypt.hash(password, salt);
    return hashedPW
}

export const getJWT = async (user: User) => {
    return jwt.sign(
        { userId: user.id, userName: user.username },
        process.env.JWT_SECRET as string,
        {
            expiresIn: "30d"
        }
    )
}

export const comparePW = async (password: string, user: User) => {
    return bcrypt.compare(password, user.password)
}

