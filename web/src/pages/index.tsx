import { Button, Tooltip } from "@chakra-ui/react"
import Link from "next/link"

import { Container, DarkModeSwitch, Hero, Nav } from "../components"

const Index = () => (
  <Container>
    <Nav />
    <Hero title="A place for 'Confessions'" />
    <Link href="/login">
      <span>
        <Tooltip hasArrow label="we don't know your identity so as everyone">
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
        </Tooltip>
      </span>
    </Link>

    <DarkModeSwitch />
  </Container>
)

export default Index
