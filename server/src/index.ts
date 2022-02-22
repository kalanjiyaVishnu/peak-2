import "reflect-metadata"
import { PostResolver } from "./resolver/PostResolver"
import MyContext from "./types/Context"
import { redisClient } from "./redis"
import { userResolver } from "./resolver/userResolver"
import Express from "express"
import { ApolloServer } from "apollo-server-express"
import { buildSchema } from "type-graphql"
import { createConnection } from "typeorm"
import session from "express-session"
import cors from "cors"
import connectRedis from "connect-redis"
import { config } from "dotenv"
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

  app.set("trust proxy", process.env.NODE_ENV !== "production")
  app.set("Access-Control-Allow-Origin", "https://studio.apollographql.com")
  app.set("Access-Control-Allow-Credentials", true)
  app.use(
    cors({
      credentials: true,
      origin: "https://studio.apollographql.com/",
    })
  )

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [userResolver, PostResolver],
      validate: false,
    }),
    context: ({ req, res }: MyContext) => ({ req, res }),
  })

  await apolloServer.start()

  apolloServer.applyMiddleware({
    app,
    cors: {
      credentials: true,
      origin: "https://studio.apollographql.com/",
    },
  })

  app.get("/bob", (req, res) => {
    console.log(req.session)

    res.send("bob")
  })

  app.listen(4000, () =>
    console.log("server running on http://localhost:4000/graphql")
  )
}

main()
