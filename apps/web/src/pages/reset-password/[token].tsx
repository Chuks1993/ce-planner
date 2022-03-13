import React from 'react'
import {
  Container,
  Text,
  Button,
  FiEye,
  FiEyeOff,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Link,
  FormField
} from 'ui'
import NextLink from 'next/link'
import { useForm } from 'react-hook-form'
import { GetStaticPaths, GetStaticPropsContext } from 'next'
import { useResetPasswordMutation } from '@src/graphql/generated'
import { BasicLayout } from '@src/layouts'

const ResetPassoword = ({ token }) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitSuccessful }
  } = useForm()

  const { mutate, data: { resetPassword: { data } = {} } = {} } =
    useResetPasswordMutation()
  const [showPassword, setShowPassword] = React.useState(false)

  // if (!token) return <div>Something went wrong</div>
  if (data)
    return (
      <div>
        Password has been successfully reset. Click{' '}
        <NextLink href="/login" passHref>
          <Link color="blue.500">here</Link>
        </NextLink>{' '}
        to login
      </div>
    )

  const onSubmit = input => {
    mutate({
      input: {
        password: input.password,
        token
      }
    })
  }

  return (
    <Stack
      spacing="5"
      as="form"
      w="100%"
      h="full"
      mt="20%"
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormField
        label="Password"
        htmlFor="password"
        errorMessage={errors?.password?.message}
      >
        <InputGroup>
          <Input
            id="password"
            placeholder="password"
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 8,
                message: 'Password must be atleast 8 characters'
              },
              pattern: {
                value:
                  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/,
                message:
                  'Password must contain atleast one uppercase, one lowercase, one number, and one special character'
              }
            })}
            type={showPassword ? 'text' : 'password'}
          />
          <InputRightElement h={'full'}>
            <Button
              variant={'ghost'}
              onClick={() => setShowPassword(showPassword => !showPassword)}
            >
              {showPassword ? <FiEye /> : <FiEyeOff />}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormField>
      <FormField
        label="Confirm Password"
        htmlFor="confirmPassword"
        errorMessage={errors?.confirmPassword?.message}
      >
        <Input
          id="confirmPassword"
          placeholder="confirm password"
          {...register('confirmPassword', {
            required: 'Confirm password is required'
          })}
          type="password"
        />
      </FormField>
      <Stack spacing="5">
        <Button
          disabled={isSubmitSuccessful}
          colorScheme="purple"
          isFullWidth
          type="submit"
        >
          Submit
        </Button>

        {errors?.submit && <Text color="red">{errors?.submit.message}</Text>}
      </Stack>
    </Stack>
  )
}

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: 'blocking' //indicates the type of fallback
  }
}

export async function getStaticProps(ctx: GetStaticPropsContext) {
  const token = ctx.params.token as string
  return {
    props: {
      token
    }
  }
}

ResetPassoword.getLayout = function getLayout(page: React.ReactElement) {
  return <BasicLayout>{page}</BasicLayout>
}

export default ResetPassoword
