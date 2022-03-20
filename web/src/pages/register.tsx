import * as React from "react"
import { DarkModeSwitch, Wrapper } from "../components"

import { Form, Formik } from "formik"
import InputField from "../components/InputField"
import { Button } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { useRegisterMutation } from "../generated/graphql"
import toErrMap from "../utils/toErrMap"
const Register: React.FC = () => {
  const [, register] = useRegisterMutation()
  const router = useRouter()
  return (
    <Wrapper>
      <Formik
        initialValues={{ name: "", email: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const res = await register({
            data: {
              ...values,
            },
          })

          if (res.data?.register.errors) {
            setErrors(toErrMap(res.data.register.errors))
          } else {
            router.push("/home")
          }
          return false
        }}
      >
        {({ isSubmitting }) => {
          return (
            <Form>
              <InputField name="name" label="name" />

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
                register
              </Button>
            </Form>
          )
        }}
      </Formik>
      <DarkModeSwitch />
    </Wrapper>
  )
}

export default Register
