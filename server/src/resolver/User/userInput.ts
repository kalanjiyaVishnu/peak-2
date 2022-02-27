import { LocationInputs } from "./LocationInputs"
// import { IsEmailAlreadyExist } from "./IsEmailAlreadyExist"
import { Field, InputType } from "type-graphql"
import { IsEmail, Length } from "class-validator"

@InputType()
export class userInput {
  @Field()
  @Length(0, 255, { message: "name must be grater than 0" })
  name: string

  @Field()
  @IsEmail({ message: "name must be grater than 0" })
  email: string
  // @IsEmailAlreadyExist({
  //   message: "User already exists. Choose another name.",
  // })

  @Field()
  password: string

  @Field({ nullable: true })
  location: LocationInputs
}
