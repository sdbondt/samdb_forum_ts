import { AfterLoad, BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "./CategoryEntity";
import { Like } from "./LikeEntity";
import { Topic } from "./TopicEntity";
import { User } from "./UserEntity";

@Entity('post')
export class Post extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    content: string

    @ManyToOne(
        () => Category,
        category => category.posts,
        { onDelete: 'CASCADE'}
    )
    @JoinColumn({
        name: 'categoryId'
    })
    category: Category

    @Column({
        name: 'categoryId'
    })
    categoryId: number

    @ManyToOne(
        () => Topic,
        topic => topic.posts,
        { onDelete: 'CASCADE'}
    )
    @JoinColumn({
        name: 'topicId'
    })
    topic: Topic

    @Column({
        name: 'topicId'
    })
    topicId: number

    @ManyToOne(
        () => User,
        user => user.posts,
        { onDelete: 'CASCADE'}
    )
    @JoinColumn({
        name: 'userId'
    })
    user: User

    @Column({
        name: 'userId'
    })
    userId: number

    @OneToMany(
        () => Like,
        like => like.post
    )
    likes: Like[]

    get likeCount(): number {
        return this.likes.length || 0
    }
}