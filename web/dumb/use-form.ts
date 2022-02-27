import { useState, ChangeEventHandler } from "react"

export default function useForm(init) {
  const [values, setInpupts] = useState(init)
  console.log(values)
  const isValid = false
  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    console.log(e.target.value)

    setInpupts({ ...values, [e.target.name]: e.target.value })
  }
  return [values, handleInputChange, isValid]
}
