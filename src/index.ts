import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import morgan from 'morgan'
import { createConnection } from 'typeorm'
import notFoundHandler from './errorhandlers/notFoundHandler'
import errorHandler from './errorhandlers/errorHandler'
import { Like } from './entities/LikeEntity'
import { User } from './entities/UserEntity'
import { Topic } from './entities/TopicEntity'
import { Category } from './entities/CategoryEntity'
import { Post } from './entities/PostEntity'
import { userRouter } from './routes/userRouter'
import { postRouter } from './routes/postRouter'
import { likeRouter } from './routes/likeRouter'
import { categoryRouter } from './routes/categoryRouter'
import { topicRouter } from './routes/topicRouter'
import { authRouter } from './routes/authRouter'
import { auth } from './middleware/authMiddleware'

dotenv.config()
const app = express()
const PORT: number = parseInt(process.env.PORT as string) || 5000

const main = async () => {
    try {
        await createConnection({
			type: 'postgres',
			host: process.env.PG_HOST,
			port: 5432,
			username: process.env.PG_USER,
			password: process.env.PG_PASSWORD,
			database: process.env.PG_DB,
            synchronize: true,
            entities: [User, Like, Topic, Category, Post]
        })

        app.use(express.json())
        app.use(cors())
        app.use(morgan('dev'))

        app.use('/users', auth, userRouter)
        app.use('/posts', auth, postRouter)
        app.use('/likes', auth, likeRouter)
        app.use('/categories', auth, categoryRouter)
        app.use('/topics', auth, topicRouter)
        app.use('/auth', authRouter)
        
        app.use(notFoundHandler)
        app.use(errorHandler)

        app.listen(PORT, () => {
			console.log(`Server is running on port ${PORT}.`)
		})
    } catch (e) {
        console.error(e)
		throw new Error('Unable to connect to the database.')
    }
}

main()