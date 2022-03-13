import { FormControl, FormLabel, FormErrorMessage } from '@chakra-ui/react'

type FormFieldProps = {
  label?: string
  children: React.ReactNode
  errorMessage?: string
  htmlFor: string
}

export const FormField = ({
  label,
  children,
  errorMessage,
  htmlFor
}: FormFieldProps) => {
  return (
    <FormControl isInvalid={!!errorMessage}>
      {label && <FormLabel htmlFor={htmlFor}>{label}</FormLabel>}
      {children}
      <FormErrorMessage>{errorMessage && errorMessage}</FormErrorMessage>
    </FormControl>
  )
}
