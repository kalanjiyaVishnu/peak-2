import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  Spacer,
  Text,
  useColorMode,
} from "@chakra-ui/react"
import { useLogoutMutation, useMeQuery } from "../generated/graphql"
import { BellIcon } from "@chakra-ui/icons"
import Link from "next/link"
import logoDark from "../utils/assets/warning-triangle-dark.png"
import logoLight from "../utils/assets/warning-triangle-light.png"
import Image from "next/image"
interface NavProps {
  children?: JSX.Element
}
const Nav: React.FC<NavProps> = ({ children }) => {
  const [{ data, fetching }] = useMeQuery()
  console.log("in nav --> ", data)

  const { colorMode } = useColorMode()

  const [{ fetching: logoutFetching }, logout] = useLogoutMutation()
  let rightSide: JSX.Element
  if (fetching) {
  } else if (!data?.Me) {
    rightSide = (
      <ButtonGroup spacing="6">
        <Link href="/register">
          <Button colorScheme={"gray"} size="sm" _focus={{ outline: "none" }}>
            Register
          </Button>
        </Link>
        <Link href="/login">
          <Button
            colorScheme={"gray"}
            variant={"outline"}
            outline="2px"
            size="sm"
            _focus={{ outline: "none" }}
          >
            Login
          </Button>
        </Link>
      </ButtonGroup>
    )
  } else {
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
          <Text ml="2" fontSize={"1.2rem"} color="white">
            {data.Me.name}
          </Text>
        </Box>
        {children}
        <BellIcon fontSize={"2xl"} />
        <Link href="/login">
          <Button
            colorScheme={"gray"}
            variant={"outline"}
            outline="2px"
            size="sm"
            _focus={{ outline: "none" }}
            isLoading={logoutFetching}
            onClick={() => {
              console.log("your are logged out")
              logout()
            }}
          >
            Log-out
          </Button>
        </Link>
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
      {rightSide}
    </Flex>
  )
}
export default Nav
