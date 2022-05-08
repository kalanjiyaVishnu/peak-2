import {
  Arg,
  Ctx,
  Int,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql"
import { getConnection } from "typeorm"
import MyContext from "../types/Context"
import { Post } from "./../entity/post"
import { PostInputs } from "./Post/postInput"
import { isAuth } from "../utils/isAuth"

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

    if (inputs.body.length > 200) {
      return false
    }

    return await Post.create({
      ...inputs,
      creatorId: req.session.userId,
    }).save()
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
    const property = await this.postRepo.findOne({
      where: { id: inputs.postId },
    })
    return await this.postRepo.save({
      id: inputs.postId,
      ...property,
      ...inputs,
    })
  }

  @UseMiddleware(isAuth)
  @Query(() => [Post])
  posts(
    @Arg("limit", () => Int) limit: number,
    @Arg("cursor", () => String, { nullable: true }) cursor: string
  ) {
    const qb = getConnection()
      .getRepository(Post)
      .createQueryBuilder("p")
      .orderBy('"createdAt"', "DESC")
      .take(limit)

    if (cursor) {
      qb.where('"createdAt" < :cursor', { cursor: new Date(cursor) })
    }

    return qb.getMany()
    // return Post.find({
    //   where: { creatorId: req.session.userId },
    //   order: { createdAt: "DESC" },
    // })
  }
}
