import "reflect-metadata"
import Express from "express"
import { ApolloServer } from "apollo-server-express"
import connectRedis from "connect-redis"
import cors from "cors"
import { config } from "dotenv"
import session from "express-session"
import { buildSchema } from "type-graphql"
import { createConnection } from "typeorm"
import { _prod_ } from "./constants/globals"
import { redisClient } from "./redis"
import { PostResolver } from "./resolver/PostResolver"
import { userResolver } from "./resolver/userResolver"
import MyContext from "./types/Context"

const main = async () => {
  config()
  await createConnection()

  const app = Express()

  const RedisStore = connectRedis(session)

  app.use(
    session({
      name: "my cookie",
      store: new RedisStore({ client: redisClient, disableTouch: true }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, //10 years
        httpOnly: true,
        secure: true,
        sameSite: "none",
      },
      saveUninitialized: false,
      secret: process.env.SESSION_SECRET as string,
      resave: false,
    })
  )
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [userResolver, PostResolver],
      validate: false,
    }),
    context: ({ req, res }: MyContext) => ({ req, res }),
  })
  app.set("trust proxy", !_prod_)
  // app.use(function (req, res, next) {
  //   res.header("Access-Control-Allow-Origin", "*")
  //   res.header(
  //     "Access-Control-Allow-Headers",
  //     "Origin, X-Requested-With, Content-Type, Accept"
  //   )
  //   next()
  // })
  app.use(
    cors({
      credentials: true,
      origin: ["https://studio.apollographql.com", "http://localhost:3000"],
    })
  )

  await apolloServer.start()

  apolloServer.applyMiddleware({
    app,
    cors: false,
    // path: "/",
  })

  app.get("/bob", (req, res) => {
    console.log(req.session)

    res.send("bob")
  })

  app.listen(5000, () =>
    console.log(
      `🚀 Server ready at http://localhost:5000${apolloServer.graphqlPath}`
    )
  )
}

main()
