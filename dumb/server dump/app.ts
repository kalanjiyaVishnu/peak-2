// import { ApolloServer } from "apollo-server-express"
// import { ApolloServerPluginDrainHttpServer, gql } from "apollo-server-core"
// import express from "express"
// import http from "http"
// const typeDefs = gql`
//   # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

//   # This "Book" type defines the queryable fields for every book in our data source.

//   # The "Query" type is special: it lists all of the available queries that
//   # clients can execute, along with the return type for each. In this
//   # case, the "books" query returns an array of zero or more Books (defined above).
//   type Query {
//     hello: String
//   }
// `
// const resolvers = {
//   Query: {
//     hello: (_: any, { name }: any): String => {
//       return `hello ${name || "world"}`
//     },
//   },
// }

// async function startApolloServer() {
//   // Required logic for integrating with Express
//   const app = express()

//   // Same ApolloServer initialization as before, plus the drain plugin.
//   const server = new ApolloServer({
//     typeDefs,
//     resolvers,
//   })

//   // More required logic for integrating with Express
//   await server.start()
//   server.applyMiddleware({
//     app,

//     // By default, apollo-server hosts its GraphQL endpoint at the
//     // server root. However, *other* Apollo Server packages host it at
//     // /graphql. Optionally provide this to match apollo-server.
//     path: "/",
//   })

//   // Modified server startup
//   app.listen(4000, () => {
//     console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
//   })
// }

// startApolloServer()
