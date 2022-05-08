import { Flex, FlexProps, useColorMode } from "@chakra-ui/react"
import "@fontsource/poppins"
import { bgColor, color } from "../utils/color"
import DarkModeSwitch from "./DarkModeSwitch"

export default ({ children, ...opts }: FlexProps) => {
  const { colorMode } = useColorMode()

  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="flex-start"
      bg={bgColor[colorMode]}
      color={color[colorMode]}
      minH={"100vh"}
      py="1rem"
      {...opts}
    >
      {children}
      <DarkModeSwitch />
    </Flex>
  )
}
