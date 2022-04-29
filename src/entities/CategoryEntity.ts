import { SectionCategoryEnum } from "../types/types";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Post } from "./PostEntity";
import { Topic } from "./TopicEntity";

@Entity('category')
export class Category extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: 'enum',
        enum: SectionCategoryEnum
    })
    name: string

    @OneToMany(
        () => Topic,
        topic => topic.category
    )
    topics: Topic[]

    @OneToMany(
        () => Post,
        post => post.category
    )
    posts: Post[]
}