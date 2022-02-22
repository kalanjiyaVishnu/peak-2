import MyContext from "../../types/Context"
import { MiddlewareFn } from "type-graphql"
export const isAuth: MiddlewareFn<MyContext> = async (
  { context: { req } },
  next
) => {
  if (!req.session.userId) {
    throw new Error("user not authorized")
  }
  return next()
}
