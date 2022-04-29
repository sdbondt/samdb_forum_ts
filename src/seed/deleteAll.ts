import { Post } from "../entities/PostEntity"
import { User } from "../entities/UserEntity"
import { Category } from "../entities/CategoryEntity"
import { Topic } from "../entities/TopicEntity"
import { Like } from "../entities/LikeEntity"

export const deleteAll = async () => {
    await Category.query('DELETE FROM "category";')
    await User.query('DELETE FROM "user";')
    await Post.query('DELETE FROM "post";')
    await Topic.query('DELETE FROM "topic";')
    await Like.query('DELETE FROM "like"')
    console.log('deleted data')
}