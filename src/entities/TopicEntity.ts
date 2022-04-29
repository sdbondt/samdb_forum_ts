import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "./CategoryEntity";
import { Post } from "./PostEntity";
import { User } from "./UserEntity";


@Entity('topic')
export class Topic extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        length: '50',
        unique: true
    })
    title: string

    @Column()
    firstPost: string

    @ManyToOne(
        () => Category,
        category => category.topics,
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

    @OneToMany(
        () => Post,
        post => post.topic
    )
    posts: Post[]

    @ManyToOne(
        () => User,
        user => user.topics,
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
}