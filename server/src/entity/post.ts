import { Field, ObjectType } from "type-graphql"
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm"
import { User } from "./user"

// @ObjectType()
// @Entity()
// export class Comment extends BaseEntity {
//   @PrimaryGeneratedColumn()
//   id: number

//   @Field()
//   @Column("uuid")
//   from: string

//   @Field()
//   @Column({ type: "uuid" })
//   to: string

//   @Field()
//   @Column("text")
//   message: string
// }

@ObjectType()
@Entity()
export class Post extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Field()
  @Column("uuid")
  creatorId: string

  @Field()
  @Column()
  title: string

  @Field()
  @Column()
  body: string

  // @Field(() => [String])
  // @Column("text", { array: true, default: ["type something"] })
  // body: string[]

  @Field()
  @CreateDateColumn()
  createdAt: Date

  @Field()
  @UpdateDateColumn()
  updatedAt: Date
  // @Field(() => [Comment], { nullable: true })
  // comments: Comment[]

  @ManyToOne(() => User, (User) => User.posts)
  creator: User
}
