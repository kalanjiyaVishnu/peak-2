import { isAuth } from "./User/isAuth"
import { UserResponse } from "./User/UserResponse"
import { userInput } from "./User/userInput"
import { User } from "../entity/User"
import {
  Arg,
  Ctx,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql"
import { hash, verify } from "argon2"
import MyContext from "src/types/Context"
import { Post } from "../entity/Post"

@Resolver(() => User)
export class userResolver {
  @Query(() => String)
  hello(@Arg("name") name: string) {
    return "hello " + name
  }

  @Query(() => User, { nullable: true })
  async Me(@Ctx() { req }: MyContext) {
    if (!req.session.userId) {
      return null
    }
    const user = await User.findOne({ id: req.session.userId })
    return user
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg("data") input: userInput,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    if (!input.name) {
      return {
        errors: [
          {
            field: "name",
            message: "what do we call you? null",
          },
        ],
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

    if (input.password.length < 4) {
      return {
        errors: [
          {
            field: "password",
            message: "password length must be 4",
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

  @UseMiddleware(isAuth)
  @FieldResolver()
  async posts(@Root() parent: User): Promise<Post[] | []> {
    const posts = await Post.find({ where: { userID: parent.id } })
    if (!posts.length) {
      return []
    }

    console.log(parent.posts)

    return posts
  }

  @Mutation(() => Boolean)
  async logout(@Ctx() { req }: MyContext) {
    return new Promise((resolve) => {
      req.session.destroy((err) => {
        if (err) {
          console.log("while destroying req session", err)
        }
        resolve(true)
      })

      resolve(false)
    })
  }
}
