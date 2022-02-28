import { Box, Button, Flex, Heading, Spacer, Text } from "@chakra-ui/react"
import { useMeQuery } from "../generated/graphql"
import { BellIcon } from "@chakra-ui/icons"
interface NavProps {
  children: () => JSX.Element
}
const Nav: React.FC<NavProps> = ({ children }) => {
  const [{ data, fetching }] = useMeQuery()
  let rightSide

  if (!fetching && data.Me.errors) {
    rightSide = (
      <Box>
        <Button colorScheme="teal" mr="4">
          Sign Up
        </Button>
        <Button colorScheme="teal">Log in</Button>
      </Box>
    )
  }

  if (!fetching && data.Me.user) {
    rightSide = (
      <Flex align={"center"} justify="center">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
          <path d="M224 256c70.7 0 128-57.31 128-128s-57.3-128-128-128C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3C77.61 304 0 381.6 0 477.3c0 19.14 15.52 34.67 34.66 34.67h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304z" />
        </svg>
        {/* <Text fontSize="1.5rem" color="gray.900">
          {data.Me.user.name}
        </Text> */}
        <BellIcon w="1.5rem" h="1.5rem" mt="2" />
      </Flex>
    )
  }

  return (
    <Flex pos={"fixed"} top="1" left={"10"} right="10" p="2">
      <Box w="2rem">
        <img
          src="https://img.icons8.com/pastel-glyph/64/000000/warning-triangle.png"
          className="select-none"
          draggable={false}
        />
      </Box>

      <Heading fontSize={"2xl"}>Quotee</Heading>

      <Spacer />
      {rightSide}

      {children()}
    </Flex>
  )
}
export default Nav
