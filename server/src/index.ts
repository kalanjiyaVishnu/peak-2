import { ApolloServer } from "apollo-server-express"
import connectRedis from "connect-redis"
import cors from "cors"
import { config } from "dotenv"
import Express from "express"
import session from "express-session"
import "reflect-metadata"
import { buildSchema } from "type-graphql"
import { createConnection } from "typeorm"
import { _prod_ } from "./constants/globals"
import { PostResolver } from "./resolver/PostResolver"
import { userResolver } from "./resolver/userResolver"
import MyContext from "./types/Context"
import { redisClient } from "./utils/redis"

const main = async () => {
  config()
  
  await createConnection()

  const app = Express()

  const RedisStore = connectRedis(session)

  app.use(
    session({
      name: "qid",
      store: new RedisStore({ client: redisClient, disableTouch: true }),
      cookie: {
        maxAge: 12 * 60 * 60 * 1000, // --> one day, // 86 secs 60 * 60 * 24,
        // httpOnly: true,
        // secure: true,
        // sameSite: "none",
      },
      secret: "soemtiosdfads",
      saveUninitialized: false,
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

    res.send("bob --> ")
  })

  app.listen(5000, () =>
    console.log(
      `🚀 Server ready at http://localhost:5000${apolloServer.graphqlPath}`
    )
  )
}

main()
