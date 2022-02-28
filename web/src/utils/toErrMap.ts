import { FieldError } from "../generated/graphql"
export default (errors: FieldError[]) => {
  const error: Record<string, string> = {}

  errors.forEach(({ message, field }) => {
    error[field] = message
  })
  console.log("after --> err map", error)

  return error
}
