import { userInput } from "./../resolver/User/userInput"
const isValid = (input: userInput) => {
  if (!input.name) {
    return [
      {
        field: "name",
        message: "what do we call you? null",
      },
    ]
  }

  if (input.password.length < 4) {
    return [
      {
        field: "password",
        message: "password length must be 4",
      },
    ]
  }
  return null
}
export default isValid
