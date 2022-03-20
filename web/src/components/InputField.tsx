import { InfoIcon } from "@chakra-ui/icons"
import {
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react"
import { useField } from "formik"
import { InputHTMLAttributes } from "react"
import { getTextColour } from "../utils/color"
type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string
  label: string
}

const InputField: React.FC<InputFieldProps> = ({
  size: _,
  label,
  ...props
}) => {
  const [fields, { error }] = useField(props)
  return (
    <FormControl isInvalid={!!error} mb="2">
      <Flex
        mb="0.5rem"
        alignItems={"center"}
        justifyContent="center"
        textAlign={"center"}
      >
        <FormLabel
          htmlFor={props.name}
          color="GrayText"
          minW={"5rem"}
          textColor="gray"
          fontWeight={"normal"}
        >
          {label}
        </FormLabel>

        <Box>
          <Input
            {...fields}
            id={props.name}
            placeholder={props.name}
            type={props.type}
            color={getTextColour()}
            bg={"transparent"}
            _focus={{
              textColor: getTextColour(),
              bg: "transparent",
            }}
          />
          {error && (
            <FormErrorMessage ml="auto" w={"fit-content"}>
              <InfoIcon />
              {error}
            </FormErrorMessage>
          )}
        </Box>
      </Flex>
    </FormControl>
  )
}
export default InputField
