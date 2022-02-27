import { Box, Flex, Heading } from "@chakra-ui/react"

export default () => (
  <Flex
    align="center"
    justify="center"
    gap={"0.5rem"}
    pos="fixed"
    top="1"
    left="1"
  >
    <Box w="2rem">
      <img
        src="https://img.icons8.com/pastel-glyph/64/000000/warning-triangle.png"
        className="select-none"
        draggable={false}
      />
    </Box>
    <Heading fontSize={"2xl"}>Quotee</Heading>
  </Flex>
)
