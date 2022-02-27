import { User } from "../../entity/User"
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
export class UserResponse {
  @Field(() => User, { nullable: true })
  user?: User

  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[]
}
