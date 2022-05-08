import * as React from "react"
import { DarkModeSwitch, Wrapper } from "../components"

import { Button } from "@chakra-ui/react"
import { Form, Formik } from "formik"
import { withUrqlClient } from "next-urql"
import { useRouter } from "next/router"
import InputField from "../components/InputField"
import { useLoginMutation } from "../generated/graphql"
import createUrqlClient from "../utils/createUrqlClient"
import toErrMap from "../utils/toErrMap"

const Login: React.FC = () => {
  const [, login] = useLoginMutation()
  const router = useRouter()
  return (
    <Wrapper>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const res = await login(values)
          // console.log(res)

          if (res.data.login.errors) {
            setErrors(toErrMap(res.data.login.errors))
          } else if (res.data.login.user) {
            router.push("/home")
          }
          return false
        }}
      >
        {({ isSubmitting }) => {
          return (
            <Form>
              <InputField name="email" label="email" type="email" />

              <InputField name="password" label="password" type="password" />

              <Button
                isLoading={isSubmitting}
                colorScheme="teal"
                mt="1rem"
                size="md"
                type="submit"
                ml="33%"
              >
                login
              </Button>
            </Form>
          )
        }}
      </Formik>
      <DarkModeSwitch />
    </Wrapper>
  )
}

export default withUrqlClient(createUrqlClient)(Login)
