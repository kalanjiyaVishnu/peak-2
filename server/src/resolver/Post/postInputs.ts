import { Field, InputType } from "type-graphql"
import { Length } from "class-validator"

@InputType()
export class PostInputs {
  @Field({ nullable: true })
  postId?: string

  @Field()
  @Length(0, 255, { message: "name must be grater than 0" })
  title: string

  @Field(() => [String])
  body: string[]
}
