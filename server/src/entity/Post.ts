import { Field, ObjectType } from "type-graphql"
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm"

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
  userID: string

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
  createdDate: Date

  @Field()
  @UpdateDateColumn()
  updatedDate: Date
  // @Field(() => [Comment], { nullable: true })
  // comments: Comment[]

  // @ManyToOne(() => User, (user) => user.posts)
  // user: User
}
