import { ButtonGroup, Button } from "@chakra-ui/react"
import Link from "next/link"
import { Container, DarkModeSwitch, Hero, Main, Nav } from "../components"

const Index = () => (
  <Container>
    <Nav />
    <Hero title="A social Media for Quotes" />
    <ButtonGroup spacing="6">
      <Link href="\register">
        <Button colorScheme={"teal"} size="sm" _focus={{ outline: "none" }}>
          Register
        </Button>
      </Link>
      <Link href="\">
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

    <DarkModeSwitch />
  </Container>
)

export default Index
