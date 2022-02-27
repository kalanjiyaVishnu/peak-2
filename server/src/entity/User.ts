import { Post } from "./Post"
import { Field, ObjectType } from "type-graphql"
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm"
import Location from "./Location"
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

  @Field(() => Location, { nullable: true })
  @Column(() => Location)
  location: Location

  @Field(() => [Post], { nullable: true })
  @Column("text", { default: [], array: true })
  posts: String[]

  // @Field(() => [Post])
  // @OneToMany(() => Post, (post) => post.user)
  // posts: Post[]
}
