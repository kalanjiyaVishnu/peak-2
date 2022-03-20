import { InfoIcon } from "@chakra-ui/icons"
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Textarea,
  ModalFooter,
  Button,
  Stack,
  FormErrorMessage,
  FormControl,
} from "@chakra-ui/react"
import { Formik, Form } from "formik"
import { useCreatePostMutation } from "../generated/graphql"
import InputField from "./InputField"

export default function CreatePost({ isOpen, onOpen, onClose }) {
  const [, createPost] = useCreatePostMutation()
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent w={[370, 500]}>
        <ModalHeader>Create a Post</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Formik
            initialValues={{ title: "", body: "" }}
            onSubmit={async (input, { setErrors }) => {
              const res = await createPost({ input })

              if (!res.data?.addPost) {
                setErrors({ body: "check the content" })
              } else {
                onClose()
              }
              return false
            }}
          >
            {({ isSubmitting, handleChange, errors }) => {
              return (
                <Form>
                  <InputField
                    name="title"
                    placeholder="the cool title"
                    label="title"
                  />
                  <FormControl isInvalid={!!errors.body} mb="2">
                    <Textarea
                      placeholder="post your thing 🐱‍🏍"
                      name="body"
                      onChange={handleChange}
                    />
                    {errors && (
                      <FormErrorMessage ml="auto" w={"fit-content"}>
                        <InfoIcon mr="1" />
                        {errors.body}
                      </FormErrorMessage>
                    )}
                  </FormControl>
                  <ModalFooter>
                    <Button
                      colorScheme="blue"
                      mr={3}
                      onClick={onClose}
                      size="sm"
                    >
                      Close
                    </Button>
                    <Button
                      variant="outline"
                      type="submit"
                      size="sm"
                      isLoading={isSubmitting}
                    >
                      post
                    </Button>
                  </ModalFooter>
                </Form>
              )
            }}
          </Formik>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
function TextOptions({ handleOptForText }) {
  return (
    <Stack direction={["column", "row"]} spacing="8px" my="0.4rem">
      <Button size={"xs"} onClick={() => handleOptForText("bold")}>
        B
      </Button>
      <Button size={"xs"} as="i">
        I
      </Button>
      <Button size={"xs"} as="u">
        U
      </Button>
    </Stack>
  )
}
