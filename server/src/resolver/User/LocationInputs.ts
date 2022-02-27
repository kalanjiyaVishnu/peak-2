import { Field } from "type-graphql"
import { InputType } from "type-graphql"
@InputType()
export class LocationInputs {
  @Field({ nullable: true })
  latitude?: string

  @Field({ nullable: true })
  longitude?: string
}
