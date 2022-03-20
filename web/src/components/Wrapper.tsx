import { Box } from "@chakra-ui/react"
import React from "react"
type WrapperProps = {
  size?: "small" | "regular"
  options?: any
}
const Wrapper: React.FC<WrapperProps> = ({
  children,
  size = "regular",
  ...options
}) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      overflow="hidden"
      justifyContent="center"
      boxSize={size == "small" ? "sm" : "md"}
      w="full"
      {...options}
    >
      {children}
    </Box>
  )
}
export default Wrapper
