import * as React from "react"
import { Container, DarkModeSwitch, Wrapper } from "../components"

import { Form, Formik } from "formik"
import InputField from "../components/InputField"
import { Box, Button } from "@chakra-ui/react"
import { useMutation } from "urql"

const Register: React.FC = () => {
  const [, Register] = useMutation(`mutation register($data: userInput!){
    register(data: $data) {
      user {
        email
        id
        name
      }
      errors {
        field
        message
      }
    }
  }
  `)
  return (
    <Wrapper>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          console.log(values)
          const res = await Register({
            data: {
              ...values,
              location: {
                latitude: "adsfadsf",
                longitude: "asdf",
              },
              name: "something new",
            },
          })
          console.log(res)
          return false
        }}
      >
        {({ isSubmitting }) => {
          return (
            <Form>
              <InputField name="email" label="email" />

              <Box mt="0.8rem">
                <InputField name="password" label="password" type="password" />
              </Box>

              <Button
                isLoading={isSubmitting}
                colorScheme="teal"
                mt="1rem"
                size="sm"
                type="submit"
              >
                submit
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
