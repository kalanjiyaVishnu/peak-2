import { Box } from "@chakra-ui/react"
import React from "react"
type WrapperProps = {
  size?: "small" | "regular"
}
const Wrapper: React.FC<WrapperProps> = ({ children, size = "regular" }) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      overflow="hidden"
      justifyContent="center"
      boxSize={size == "small" ? "sm" : "md"}
      w="full"
    >
      {children}
    </Box>
  )
}
export default Wrapper
