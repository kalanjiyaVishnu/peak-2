import { Post } from "./../entity/Post"
import { isAuth } from "./User/isAuth"
import { PostInputs } from "./Post/postInputs"
import MyContext from "../types/Context"
import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql"
import { getConnection } from "typeorm"

@Resolver()
export class PostResolver {
  postRepo = getConnection().getRepository(Post)

  @UseMiddleware(isAuth)
  @Mutation(() => Post)
  async addPost(
    @Arg("input") inputs: PostInputs,
    @Ctx() { req }: MyContext
  ): Promise<Post | boolean> {
    if (!inputs.title) {
      return false
    }

    if (inputs.body.length > 20) {
      return false
    }

    return await Post.create({ ...inputs, userID: req.session.userId }).save()
  }

  @UseMiddleware(isAuth)
  @Query(() => Boolean)
  async deletePost(@Arg("postId") postId: string): Promise<boolean> {
    const post = await Post.findOne({ id: postId })
    if (!post) {
      return false
    }
    await Post.delete({ id: postId })

    return true
  }

  @UseMiddleware(isAuth)
  @Mutation(() => Post)
  async updatePost(@Arg("input") inputs: PostInputs): Promise<Post> {
    // if (!inputs.title) {
    //   return {
    //     errors: [
    //       {
    //         field: "title",
    //         message: "provide title",
    //       },
    //     ],
    //   }
    // }

    // if (inputs.body.length > 20) {
    //   return {
    //     errors: [
    //       {
    //         field: "body",
    //         message: "make it shorter",
    //       },
    //     ],
    //   }
    // }
    const property = await this.postRepo.findOne({
      where: { id: inputs.postId },
    })
    return await this.postRepo.save({
      id: inputs.postId,
      ...property,
      ...inputs,
    })
  }

  @Query(() => [Post])
  async getAllPosts(@Ctx() { req }: MyContext) {
    return await Post.find({ where: { userID: req.session.userId } })
  }
}
