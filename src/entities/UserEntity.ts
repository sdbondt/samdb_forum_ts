import { UserRolesEnum } from "../types/types";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Like } from "./LikeEntity";
import { Post } from "./PostEntity";
import { Topic } from "./TopicEntity";

@Entity('user')
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    username: string

    @Column({
        unique: true
    })
    email: string

    @Column()
    password: string

    @Column({
        enum: UserRolesEnum,
    })
    role: string

    @Column({
        default: false
    })
    muted: boolean
    
    @OneToMany(
        () => Post,
        post => post.user
    )
    posts: Post[]

    @OneToMany(
        () => Topic,
        topic => topic.user
    )
    topics: Topic[]

    @OneToMany(
        () => Like,
        like => like.user
    )
    likes: Like[]
}