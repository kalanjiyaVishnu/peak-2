the me error during the update cache because the name me and Me varied in the graphql schema in the generated and the update cache
-> it sets the me to null even though there is cookie to update the data from the server instead it set the data from the login -> home -> login mutation update the me query which has a nameConflict in that sets to null

- me.graphql

```
query me {
  Me {
    email
    id
    name
    posts {
      id
      title
      body
      userID
      createdDate
      updatedDate
    }
  }
}
```

query name is set to first caps during urql hook gen
codegen which intern set the Me name to me but actually it must set the name Me so null

and also fragments after putting remaining wont work for some cases -> {
...defauktUser
posts
}

## the post shit error

me is set to respond with the userResponse which return a object containing ewither errro or the user data
login and register also set like that

- but for some reason during urql cache update type mismatch

```
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

```

- it expects MeDoc as the user form though i set everything to respond the same type as userResponse{errrr?,user}
- MeDoucment is the user form -> login gives userResponse -> mismatch -> so change in the server to return user or null in the MeQuery and again gen via codegen.yaml

# cache update not setting cookie but setting the value from the login
