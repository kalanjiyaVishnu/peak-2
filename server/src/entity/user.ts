import { Field, ObjectType } from "type-graphql"
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm"
import { Post } from "./post"
@ObjectType()
@Entity()

export class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Field()
  @Column()
  name: string

  @Field()
  @Column("text", { unique: true })
  email: string

  @Column({ nullable: false })
  password: string

  @OneToMany(() => Post, (post) => post.creator)
  posts: Post[]
}
