import { Flex, FlexProps, useColorMode } from "@chakra-ui/react"
import "@fontsource/poppins"
export default ({ children }: FlexProps) => {
  const { colorMode } = useColorMode()

  const bgColor = { light: "gray.50", dark: "#282726" }

  const color = { light: "black", dark: "white" }
  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="flex-start"
      bg={bgColor[colorMode]}
      color={color[colorMode]}
      height="100vh"
      minW={"70%"}
      py="1rem"
    >
      {children}
    </Flex>
  )
}
