import { AppProps } from "next/app"
import { ChakraProvider } from "@chakra-ui/react"
import { Provider, createClient } from "urql"
import { Container } from "../components"
import theme from "../theme"

const graphql = createClient({
  url: "http://localhost:4000/graphql",
  fetchOptions: {
    credentials: "include",
  },
})
const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider value={graphql}>
      <ChakraProvider resetCSS theme={theme}>
        <Container>
          <Component {...pageProps} />
        </Container>
      </ChakraProvider>
    </Provider>
  )
}

export default App
