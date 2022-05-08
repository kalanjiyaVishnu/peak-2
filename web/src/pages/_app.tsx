import { ChakraProvider } from "@chakra-ui/react"
import { AppProps } from "next/app"
import { Container } from "../components"
import theme from "../theme"
const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <Container>
        <Component {...pageProps} />
      </Container>
    </ChakraProvider>
  )
}

export default App
