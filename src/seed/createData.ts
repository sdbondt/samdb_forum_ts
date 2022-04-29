import { Category } from "../entities/CategoryEntity"
import { User } from "../entities/UserEntity"
import { hashPW } from "../utils/auth/auth"
import dotenv from 'dotenv'
dotenv.config()
const categories = ['music', 'sports', 'comedy', 'politics', 'movies', 'tv', 'news']

export const createData = async () => {
    for (let i = 0; i < categories.length; i++) {
        const category = Category.create({
            name: categories[i]
        })
        await category.save()
    }
    const hashedAdminPw = await hashPW(process.env.ADMIN_PASSWORD as string)
    const admin = User.create({
        username: process.env.ADMIN_USERNAME,
        password: hashedAdminPw,
        email: process.env.ADMIN_EMAIL,
        role: 'admin'
    })
    await admin.save()
    console.log('created data')
}