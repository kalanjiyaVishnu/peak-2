### --> playGround instead of sandbox
```
    import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core"
const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [userResolver, PostResolver],
      validate: false,
    }),
    context: ({ req, res }: MyContext) => ({ req, res }),
    // introspection: true,
    // plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  })
  // --> sandbox not working while cookie on i down to playground which works fine even in prod
  // and offline, for auto complete in playgroudn introspection true-->
  // app.set("trust proxy", process.env.NODE_ENV !== "production")
  // app.set("Access-Control-Allow-Origin", "http://localhost:5000/graphql")
  // app.set("Access-Control-Allow-Credentials", true)
```
### --> cookies
  ```
  app.use(
    session({
      name: "my cookie",
      store: new RedisStore({ client: redisClient, disableTouch: true }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, //10 years
        httpOnly: true,
        secure: false,
        sameSite: "lax",
      },
      saveUninitialized: false,
      secret: process.env.SESSION_SECRET as string,
      resave: false,
    })
  )
  // same site none works for sandbox
  // cookies only works in https but   localhost is http so secure false
  // resave false to avoid overhead save in redis
```
x-forwarded-proto : true for sandbox
--: https://github.com/apollographql/apollo-server/issues/5775
### cors shits
  ```
   app.use(
    cors({
      credentials: true,
      // origin: "https://studio.apollographql.com",
    })
  ) 
  apolloServer.applyMiddleware({
    app,
    cors: false,
  })
  ```