import Head from "next/head"
import { Container, DarkModeSwitch, Nav, Wrapper } from "../components"
import {
  Box,
  Button,
  Heading,
  useDisclosure,
   Grid,
  GridItem,
  SkeletonText,

} from "@chakra-ui/react"
import { AddIcon } from "@chakra-ui/icons"
import CreatePost from "../components/CreatePost"
import { useMeQuery } from "../generated/graphql"
const HomeComp = () => {
  const modelOptions = useDisclosure()
  return (
    <Container maxW={"80%"} mt="3rem">
      <Head>
        <title> Quotee Home</title>
      </Head>
      <Nav>
        {() => (
          <Button onClick={modelOptions.onOpen}>
            <AddIcon />
          </Button>
        )}
      </Nav>
      <Box>
        <CreatePost {...modelOptions} />
      </Box>
      <Posts />
      <Posts />
    </Container>
  )
}
function Posts() {
  const [{ data, fetching }] = useMeQuery()
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
  } else if (!fetching && data.Me.errors) {
    console.log("data :-->", data.Me)
    body = "eroor"
  } else if (!fetching && data.Me.user) {
    body = data.Me.user.posts.map((post) => (
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
    console.log("user posts", data.Me.user.posts)
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
export default HomeComp
