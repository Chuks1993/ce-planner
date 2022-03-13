import { useForgetPasswordMutation } from '@src/graphql/generated'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import {
  Button,
  ButtonGroup,
  Container,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Text
} from 'ui'

const ForgetPassword = () => {
  const router = useRouter()
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitSuccessful, isSubmitting }
  } = useForm()
  const { mutate: sendResetEmail } = useForgetPasswordMutation()

  const onSubmit = input => {
    sendResetEmail({ input })
  }
  return (
    <Flex minH="100vh">
      <Container as="form" onSubmit={handleSubmit(onSubmit)} p="10">
        <FormControl mb="5">
          <FormLabel htmlFor="email">Email Address</FormLabel>
          <Input
            id="email"
            placeholder="email"
            {...register('email', {
              required: 'Email is required'
            })}
            type="email"
          />
          {errors?.email && (
            <Text mt="2" color="red">
              {errors?.email.message}
            </Text>
          )}
          <FormHelperText>
            Please enter your the email address associated with your account.
            You will recieve a link to create a new password via the email.
          </FormHelperText>
        </FormControl>
        <ButtonGroup>
          <Button onClick={() => router.back()}>Back</Button>
          <Button
            disabled={isSubmitSuccessful || isSubmitting}
            colorScheme="purple"
            type="submit"
          >
            Submit
          </Button>
        </ButtonGroup>
      </Container>
    </Flex>
  )
}

export default ForgetPassword
