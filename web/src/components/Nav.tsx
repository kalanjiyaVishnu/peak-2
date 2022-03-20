import {
  Box,
  Button,
  Flex,
  Heading,
  Spacer,
  Text,
  useColorMode,
} from "@chakra-ui/react"
import { useMeQuery } from "../generated/graphql"
import { BellIcon } from "@chakra-ui/icons"
import Link from "next/link"
import logoDark from "../utils/assets/warning-triangle-dark.png"
import logoLight from "../utils/assets/warning-triangle-light.png"
import Image from "next/image"
interface NavProps {
  children?: () => JSX.Element
}
const Nav: React.FC<NavProps> = ({ children }) => {
  const [{ data, fetching }] = useMeQuery()
  let rightSide: JSX.Element
  const { colorMode } = useColorMode()
  if (!fetching && data.Me.errors) {
    rightSide = (
      <Box>
        <Link href={"/register"}>
          <Button colorScheme="teal" mr="4">
            Sign Up
          </Button>
        </Link>
        <Link href={"/login"}>
          <Button colorScheme="teal">Log in</Button>
        </Link>
      </Box>
    )
  }

  if (!fetching && data.Me.user) {
    rightSide = (
      <Flex
        alignItems="center"
        overflow="hidden"
        justifyContent="center"
        gap={"4"}
      >
        {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
          <path d="M224 256c70.7 0 128-57.31 128-128s-57.3-128-128-128C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3C77.61 304 0 381.6 0 477.3c0 19.14 15.52 34.67 34.66 34.67h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304z" />
        </svg> */}
        <Box display={"flex"}>
          <Heading fontSize="1.5rem">hey!</Heading>
          <Text ml="2" fontSize={"1.2rem"}>
            {data.Me.user.name}
          </Text>
        </Box>
        <BellIcon fontSize={"2xl"} />
      </Flex>
    )
  }

  return (
    <Flex
      pos={"fixed"}
      top="1"
      left={"10"}
      right="10"
      p="2"
      mt="2"
      mx="4"
      alignItems={"center"}
      justifyContent="center"
      bg={"darkblue"}
      zIndex="100"
    >
      <Link href="/">
        <Box display={"flex"} cursor={"pointer"}>
          <Box w="2rem">
            <Image
              src={colorMode == "light" ? logoDark : logoLight}
              alt="Picture of the author"
              width={500}
              height={500}
              className="select-none"
              draggable={false}
            />
          </Box>
          <Heading fontSize={"2xl"}>Quotee</Heading>
        </Box>
      </Link>

      <Spacer />
      {children()}
    </Flex>
  )
}
export default Nav
