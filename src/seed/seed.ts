import dotenv from 'dotenv'
import { createConnection } from 'typeorm'

import { createData } from "./createData";
import { deleteAll } from "./deleteAll";
import { User } from '../entities/UserEntity'
import { Like } from '../entities/LikeEntity'
import { Topic } from '../entities/TopicEntity'
import { Category } from '../entities/CategoryEntity'
import { Post } from '../entities/PostEntity'
dotenv.config()

const seed = async () => {
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

        await deleteAll()
        await createData()
        
    } catch (e) {
        console.error(e)
		throw new Error('Unable to connect to the database.')
    }
}


seed()