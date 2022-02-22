import { Flex, Heading } from "@chakra-ui/react"

export const Hero = ({ title }) => (
  <Flex
    justifyContent="center"
    // alignItems="center"
    mt={"8rem"}
    height="auto"
    maxW={"40rem"}
    // bgGradient="linear(to-l, #7928CA, #FF0080)"
  >
    <Heading fontSize="6vw" fontWeight={"bold"}>
      {title}
    </Heading>
  </Flex>
)
