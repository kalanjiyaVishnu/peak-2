import { AppProps } from "next/app"
import { ChakraProvider } from "@chakra-ui/react"
import { Provider, createClient, dedupExchange, fetchExchange } from "urql"
import { cacheExchange, Cache, QueryInput } from "@urql/exchange-graphcache"
import { Container } from "../components"
import theme from "../theme"
import {
  LoginMutation,
  MeDocument,
  MeQuery,
  RegisterMutation,
} from "../generated/graphql"
function betterUpdate<Result, Query>(
  cache: Cache,
  qi: QueryInput,
  result: any,
  fn: (r: Result, q: Query) => Query
) {
  return cache.updateQuery(qi, (data) => fn(result, data as any) as any)
}
const graphql = createClient({
  url: "http://localhost:5000/graphql",
  fetchOptions: {
    credentials: "include",
  },
  exchanges: [
    dedupExchange,
    cacheExchange({
      updates: {
        Mutation: {
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
    fetchExchange,
  ],
})
const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider value={graphql}>
      <ChakraProvider resetCSS theme={theme}>
        <Container>
          <Component {...pageProps} />
        </Container>
      </ChakraProvider>
    </Provider>
  )
}

export default App
