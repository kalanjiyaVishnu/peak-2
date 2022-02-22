import { Post } from "./../../entity/Post"
import { Field } from "type-graphql"
import { ObjectType } from "type-graphql"

@ObjectType()
export class FieldError {
  @Field({ nullable: true })
  field: string

  @Field({ nullable: true })
  message: string
}

@ObjectType()
export class PostResponse {
  @Field(() => [Post], { nullable: true })
  posts?: Post[]

  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[]
}
