import { useState, ChangeEventHandler } from "react"

export default function useForm(init) {
  const [values, setInpupts] = useState(init)
  const isValid = false
  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setInpupts({ ...values, [e.target.name]: e.target.value })
  }
  return [values, handleChange, isValid]
}
