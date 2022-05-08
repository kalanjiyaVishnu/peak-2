import { PostsDocument } from "./../generated/graphql"
import { dedupExchange, fetchExchange } from "urql"
import { cacheExchange } from "@urql/exchange-graphcache"
import {
  LogoutMutation,
  MeQuery,
  MeDocument,
  LoginMutation,
  RegisterMutation,
  CreatePostMutation,
  PostsQuery,
} from "../generated/graphql"
import betterUpdate from "./betterUpdate"

const createUrqlClient = (_ssrExchange) => ({
  url: "http://localhost:5000/graphql",
  fetchOptions: {
    credentials: "include" as const,
  },
  exchanges: [
    dedupExchange,
    cacheExchange({
      updates: {
        Mutation: {
          logout: (_result, args, cache, info) => {
            betterUpdate<LogoutMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              () => ({ Me: null })
            )
          },
          login: (_result, args, cache, info) => {
            console.log("ADsf")

            betterUpdate<LoginMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              (result, query) => {
                if (result.login.errors) {
                  return query
                }
                console.log("from cache update", result.login.user)
                // in graphql/me.graphql --> small or cap Me me dont care
                // but thus Me is what server says --> home -> me null-> data error because of this
                return {
                  Me: result.login.user,
                }
              }
            )
          },
          register: (_result, args, cache, info) => {
            betterUpdate<RegisterMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              (result, query) => {
                if (result.register.errors) {
                  return query
                }
                return {
                  Me: result.register.user,
                }
              }
            )
          },
        },
        queries: {},
      },
    }),
    _ssrExchange,
    fetchExchange,
  ],
})
export default createUrqlClient
