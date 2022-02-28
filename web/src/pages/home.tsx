import Head from "next/head"
import { Nav, Wrapper } from "../components"
import {
  Box,
  Button,
  FormErrorMessage,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react"
import { AddIcon, InfoIcon } from "@chakra-ui/icons"
import {
  FormEventHandler,
  LegacyRef,
  MouseEventHandler,
  useRef,
  useState,
} from "react"
import { Form, Formik } from "formik"
import { ChangeEventHandler } from "react"
import { useCreatePostMutation } from "../generated/graphql"
import useForm from "../../dumb/use-form"
const HomeComp = () => {
  const modelOptions = useDisclosure()
  return (
    <Wrapper size="regular">
      <Head>
        <title> Quotee Home</title>
      </Head>
      <Nav>
        {() => (
          <Button onClick={modelOptions.onOpen}>
            <AddIcon />
          </Button>
        )}
      </Nav>
      <Box>
        <Heading children="feeds" />

        <CreatePost {...modelOptions} />
      </Box>
    </Wrapper>
  )
}
function CreatePost({ isOpen, onOpen, onClose }) {
  const [postContent, setPostContent] = useState(["add Something"])
  const [errors, setErrors] = useState("")

  // let isBoldOn = false
  // let isItOn = false
  // let prevSentence = ""
  // let isNoStyle = true
  // type optTypes = "bold" | "italics"
  // const handleOptForText = (optType: optTypes) => {
  //   if (isNoStyle) {
  //     switch (optType) {
  //       case "bold":
  //         textBoxRef.current.value.replace(prevSentence,"").split()
  //         setPostContent([...postContent, "BSTART"])
  //         isBoldOn = true
  //         break

  //       case "italics":
  //         setPostContent([...postContent, "ISTART"])
  //         isItOn = true
  //         break

  //       default:
  //         return
  //     }
  //   } else {
  //     if (isBoldOn) {
  //       setPostContent([...postContent, "BEND"])
  //     } else if (isItOn) {
  //       setPostContent([...postContent, "IEND"])
  //     }
  //   }
  // }
  // const handleChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
  // setCurrWord(
  //   postContent[postContent.length - 1].startsWith("<")
  //     ? e.target.value
  //     : e.target.value.replace(postContent[postContent.length - 1], "")
  // )
  // if (
  //   postContent[postContent.length - 1] === "bold" ||
  //   postContent[postContent.length - 1] === "italics"
  // ) {
  //   setPostContent([...postContent, currWord])
  //   setCurrWord("")
  // } else {
  //   setPostContent([
  //     ...postContent.slice(0, postContent.length - 1),
  //     currWord,
  //   ])
  // }
  // }

  const [formValues, handleChange, isVaild] = useForm({})
  const [, createPost] = useCreatePostMutation()
  const handleSubmit: MouseEventHandler<HTMLInputElement> = async (e) => {
    e.preventDefault()
    const res = await createPost({
      input: formValues,
    })

    console.log(res)
  }
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent w={[370, 500]}>
        <ModalHeader>Create a Post</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input
            name="title"
            onChange={handleChange}
            value={formValues.title}
            placeholder="the cool title"
          ></Input>
          <Textarea
            placeholder="post your thing 🐱‍🏍"
            name="body"
            value={formValues.body}
            onChange={handleChange}
          />
          {errors && (
            <FormErrorMessage ml="auto" w={"fit-content"}>
              <InfoIcon />
              {errors}
            </FormErrorMessage>
          )}
          {/* <TextOptions handleOptForText={handleOptForText} /> */}
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose} size="sm">
            Close
          </Button>
          <Button
            variant="outline"
            type="submit"
            onClick={handleSubmit}
            size="sm"
          >
            post
          </Button>
        </ModalFooter>
      </ModalContent>
      (
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
export default HomeComp
