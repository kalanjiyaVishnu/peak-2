import { hash, verify } from "argon2"
import MyContext from "src/types/Context"
import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware
} from "type-graphql"
import { User } from "../entity/user"
import { isAuth } from "../utils/isAuth"
import isValid from "../utils/isValid"
import { userInput } from "./User/userInput"
import { UserResponse } from "./User/UserResponse"

@Resolver(() => User)
export class userResolver {
  @Query(() => String)
  hello(@Arg("name") name: string) {
    return "hello " + name
  }

  @Query(() => User, { nullable: true })
  @UseMiddleware(isAuth)
  Me(@Ctx() { req }: MyContext) {
    return User.findOne({ id: req.session.userId })
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg("data") input: userInput,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    const errors = isValid(input)
    if (errors) {
      return {
        errors,
      }
    }

    const isUserAlreadyExits = await User.find({
      where: { email: input.email },
    })
    if (isUserAlreadyExits.length > 0) {
      return {
        errors: [
          {
            field: "email",
            message: "mail already taken",
          },
        ],
      }
    }

    const hashedPassword = await hash(input.password)

    try {
      const user = await User.create({
        ...input,
        password: hashedPassword,
      }).save()

      req.session.userId = user.id

      return { user }
    } catch (err) {
      return {
        errors: [
          {
            field: "user",
            message: err.message,
          },
        ],
      }
    }
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    const user = await User.findOne({ email })

    if (!user) {
      return {
        errors: [
          {
            field: "email",
            message: "user not dound",
          },
        ],
      }
    }
    const isValid = await verify(user.password, password)
    if (!isValid)
      return {
        errors: [
          {
            field: "password",
            message: "passworm dosn't match",
          },
        ],
      }

    req.session.userId = user.id
    return { user }
  }

  @Mutation(() => Boolean)
  async logout(@Ctx() { req, res }: MyContext) {
    return new Promise((resolve) => {
      // res.clearCookie("my cookie")
      var cookie = req.cookies
      for (var prop in cookie) {
        if (!cookie.hasOwnProperty(prop)) {
          continue
        }
        res.cookie(prop, "", { expires: new Date(0) })
      }
      req.session.destroy((err) => {
        if (err) {
          console.log("while destroying req session", err)
          resolve(false)
        }
        resolve(true)
      })
      resolve(false)
    })
  }
}
