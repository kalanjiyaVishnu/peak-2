import * as React from "react"
import { DarkModeSwitch, Wrapper } from "../components"

import { Form, Formik } from "formik"
import InputField from "../components/InputField"
import { Button } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { useLoginMutation, useMeQuery } from "../generated/graphql"
import toErrMap from "../utils/toErrMap"
import { useEffect } from "react"
const Login: React.FC = () => {
  const [, login] = useLoginMutation()
  const [{ fetching, data: MeData }] = useMeQuery()
  const router = useRouter()
  useEffect(() => {
    console.log("login --> ", MeData)

    // setTimeout(() => {
    //   if (MeData) {
    //     router.push("/home")
    //   }
    // }, 3000)
    return () => {}
  }, [])

  return (
    <Wrapper>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const res = await login(values)
          console.log(res)

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

export default Login
