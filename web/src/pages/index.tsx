import { ButtonGroup, Button, Tooltip, Heading } from "@chakra-ui/react"
import Link from "next/link"

import { Container, DarkModeSwitch, Hero, Main, Nav } from "../components"

const Index = () => (
  <Container>
    <Nav>
      {() => (
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
      )}
    </Nav>
    <Hero title="A place for 'Confessions'" />
    <Tooltip hasArrow label="we don't know your identity so as everyone">
      <Link href="/login">
        <Button
          my="1rem"
          colorScheme={"red"}
          variant={"outline"}
          outline="2px"
          size="lg"
          _focus={{ outline: "none" }}
        >
          Just Confess
        </Button>
      </Link>
    </Tooltip>

    <DarkModeSwitch />
  </Container>
)

export default Index
