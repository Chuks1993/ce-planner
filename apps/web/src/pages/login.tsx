import {
  Button,
  Container,
  Input,
  Text,
  FormControl,
  FormLabel,
  Box,
  Stack,
  TextDivider,
  Checkbox,
  Link,
  FcGoogle,
  FiEye,
  FiEyeOff,
  InputGroup,
  InputRightElement,
  Grid,
  FormField,
  GridItem,
  Flex
} from 'ui'
import NextLink from 'next/link'
import { useForm } from 'react-hook-form'
import { useSession } from '@src/lib/react-query-auth'
import { useRouter } from 'next/router'
import { useLoginUserMutation } from '@src/graphql/generated'
import React from 'react'
import { BasicLayout } from '@src/layouts'

const Login = () => {
  const router = useRouter()
  const [me, isLoading] = useSession()
  const {
    handleSubmit,
    register,
    formState: { errors },
    setError
  } = useForm()
  const [showPassword, setShowPassword] = React.useState(false)

  const { mutate: login } = useLoginUserMutation()

  if (isLoading) return <h1>Loading...</h1>
  if (me) router.push('/')

  const handleLogin = data => {
    const { rememberMe, ...rest } = data
    login(
      { input: rest },
      {
        onSettled: ({ loginUser }) => {
          if (loginUser.error)
            return setError('submit', {
              type: 'validate',
              message: loginUser.error
            })
          if (loginUser.data) {
            if (typeof router.query.next === 'string') {
              return router.push(router.query.next)
            }
            router.push('/')
          }
        }
      }
    )
  }

  return (
    <Grid
      justifyContent="center"
      onSubmit={handleSubmit(handleLogin)}
      templateColumns="repeat(5, 1fr)"
      as="form"
      gap="5"
    >
      <GridItem colSpan={5}>
        <FormField
          errorMessage={errors?.email?.message}
          htmlFor="email"
          label="Email"
        >
          <Input
            id="email"
            placeholder="email"
            {...register('email', {
              required: 'Email is required'
            })}
            type="email"
          />
        </FormField>
      </GridItem>
      <GridItem colSpan={5}>
        <FormField
          errorMessage={errors?.password?.message}
          htmlFor="password"
          label="Password"
        >
          <InputGroup>
            <Input
              id="password"
              placeholder="Password"
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
      </GridItem>

      <GridItem colSpan={5}>
        <Button colorScheme="purple" isFullWidth type="submit">
          Login
        </Button>
      </GridItem>
      <GridItem colSpan={5}>
        <Flex>
          <Checkbox
            flexGrow={1}
            colorScheme="purple"
            {...register('rememberMe')}
          >
            Remember me
          </Checkbox>
          <NextLink href="/forget-password" passHref>
            <Link color="blue.500">Forget password?</Link>
          </NextLink>
        </Flex>
      </GridItem>
      <GridItem colSpan={5}>
        <Text as="sub">
          Not yet registered?{' '}
          <NextLink href="/signup" passHref>
            <Link color="blue.500">Sign up</Link>
          </NextLink>
        </Text>
      </GridItem>
    </Grid>
  )
}

Login.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <BasicLayout
      subText="Never miss another important moment again"
      headerText="Login"
    >
      {page}
    </BasicLayout>
  )
}

export default Login
