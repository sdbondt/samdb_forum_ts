import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Post } from "./PostEntity";
import { User } from "./UserEntity";

@Entity('like')
export class Like extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(
        () => User,
        user => user.likes,
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

    @ManyToOne(
        () => Post,
        post => post.likes,
        { onDelete: 'CASCADE'}
    )
    @JoinColumn({
        name: 'postId'
    })
    post: Post

    @Column({
        name: 'postId'
    })
    postId: number


}