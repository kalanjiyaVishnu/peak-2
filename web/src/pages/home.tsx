import Head from "next/head"
import { Container, DarkModeSwitch, Nav } from "../components"
import {
  Box,
  Button,
  Grid,
  GridItem,
  Heading,
  SkeletonText,
  useDisclosure,
} from "@chakra-ui/react"
import { AddIcon } from "@chakra-ui/icons"
import CreatePost from "../components/CreatePost"
import { useMeQuery, usePostsQuery } from "../generated/graphql"
import createUrqlClient from "../utils/createUrqlClient"
import { withUrqlClient } from "next-urql"
const HomeComp = () => {
  const modelOptions = useDisclosure()
  const [{ data, fetching }] = useMeQuery()
  const [{ data: PostsData, fetching: postFetching }] = usePostsQuery({
    variables: {
      limit: 10,
    },
  })
  console.log("in home", data)

  if (fetching) {
    return <div>somethihg is sussy --{">"} still in the loading state</div>
  } else if (!data) {
    return <div>unautn ig</div>
  } else
    return (
      <Container maxW={"80%"} mt="3rem">
        <Head>
          <title> Quotee Home</title>
        </Head>
        <Nav>
          {
            <>
              <Button
                onClick={modelOptions.onOpen}
                colorScheme={"gray"}
                variant={"outline"}
                outline="2px"
                size="sm"
                _focus={{ outline: "none" }}
              >
                <AddIcon />
              </Button>
            </>
          }
        </Nav>
        <Box>
          <CreatePost {...modelOptions} />
        </Box>
        <Posts data={PostsData} fetching={postFetching} />
      </Container>
    )
}
function Posts({ data, fetching }) {
  let body
  if (fetching) {
    body = (
      <>
        <GridItem
          rowSpan={2}
          colSpan={1}
          bg="white"
          padding="6"
          boxShadow="sm"
          border={"black"}
          rounded="md"
        >
          {/* <SkeletonCircle size="10" /> */}
          <SkeletonText mt="4" noOfLines={4} spacing="4" />
        </GridItem>
        <GridItem
          colSpan={2}
          bg="white"
          padding="6"
          boxShadow="sm"
          border={"black"}
          rounded="md"
        >
          {/* <SkeletonCircle size="10" /> */}
          <SkeletonText mt="4" noOfLines={4} spacing="4" />
        </GridItem>
        <GridItem
          colSpan={2}
          bg="white"
          padding="6"
          boxShadow="sm"
          border={"black"}
          rounded="md"
        >
          {/* <SkeletonCircle size="10" /> */}
          <SkeletonText mt="4" noOfLines={4} spacing="4" />
        </GridItem>
        <GridItem
          colSpan={4}
          bg="white"
          padding="6"
          boxShadow="sm"
          border={"black"}
          rounded="md"
        >
          {/* <SkeletonCircle size="10" /> */}
          <SkeletonText mt="4" noOfLines={4} spacing="4" />
        </GridItem>
      </>
    )
  } else if (!data) {
    body = "eroor whihle fetchingh"
  } else {
    body = data.posts.map((post) => (
      <GridItem
        rowSpan={post.body.length < 10 ? 1 : 2}
        colSpan={1}
        p="3"
        rounded={"md"}
        border="1px"
        bg="red.50"
        color={"black"}
        transform={"auto"}
        transition={"ease-in-out"}
        transitionDuration="300ms"
        _hover={{
          bg: "red.300",
        }}
      >
        <Heading size={"md"} fontWeight="bold">
          {post.title}
        </Heading>
        <Box padding="4" h="full" maxH={"sm"}>
          {post.body}
        </Box>
      </GridItem>
    ))
    console.log("user posts", data.posts)
  }

  return (
    <Box>
      <Grid
        h="md"
        templateRows="repeat(auto, auto)"
        templateColumns="repeat(5, 1fr)"
        gap={4}
        border="1"
        p="3"
        w="full"
      >
        {body}
      </Grid>
      <DarkModeSwitch />
    </Box>
  )
}
export default withUrqlClient(createUrqlClient)(HomeComp)
