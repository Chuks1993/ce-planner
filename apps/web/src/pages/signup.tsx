import * as React from 'react'
import {
  Button,
  Input,
  Text,
  Link,
  InputGroup,
  InputRightElement,
  FiEye,
  FiEyeOff,
  FiCheckCircle,
  Select,
  FiCheck,
  FormField,
  Grid,
  GridItem
} from 'ui'
import NextLink from 'next/link'
import { useForm } from 'react-hook-form'
import { useSession } from '@src/lib/react-query-auth'
import { useRouter } from 'next/router'
import { useCreateUserMutation } from '@src/graphql/generated'
import { VerifyNumberFormPopup } from '@src/components'
import { BasicLayout } from '@src/layouts'

const Signup = () => {
  const router = useRouter()
  const [me, isLoading] = useSession()
  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
    resetField,
    getFieldState,
    setError,
    watch
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      phoneNumber: '',
      countryCode: '+1'
    }
  })
  const { isDirty: isPhoneNumFieldDirty, error: phoneErrors } =
    getFieldState('phoneNumber')

  const { mutate: createUser, data: { createUser: { data } = {} } = {} } =
    useCreateUserMutation()
  const [showPassword, setShowPassword] = React.useState(false)
  const [isVerified, setIsVerified] = React.useState(false)

  React.useEffect(() => {
    const subscription = watch((_, { name, type }) => {
      if (name === 'phoneNumber' && type === 'change' && isVerified) {
        setIsVerified(false)
      }
    })
    return () => subscription.unsubscribe()
  }, [isVerified, watch])

  if (isLoading) return <h1>Loading...</h1>
  if (me) router.push('/')

  const handleSignup = input => {
    const { confirmPassword, phoneNumber, countryCode, ...rest } = input
    if (input.password !== confirmPassword) {
      setError('confirmPassword', {
        type: 'pattern',
        message: 'Passwords do not match'
      })
      return
    }
    if (!isVerified) {
      return setError('phoneNumber', {
        type: 'validate',
        message: 'Please verify phone number'
      })
    }
    createUser(
      {
        input: {
          ...rest,
          phoneNumber: `${countryCode}${phoneNumber}`
        }
      },
      {
        onSettled: ({ createUser }) => {
          if (createUser.error)
            return setError('confirmPassword', {
              type: 'validate',
              message: createUser.error
            })
        }
      }
    )
  }

  const phoneNumValue = getValues('phoneNumber')
  // NOTE: Remove isVerified's error as a reason to disable the verify button
  const inValidPhoneInput = phoneErrors && phoneErrors.type !== 'validate'
  const disableVerifyBtn =
    phoneNumValue === '' ||
    inValidPhoneInput ||
    isVerified ||
    isPhoneNumFieldDirty

  return (
    <>
      {data ? (
        <>
          <FiCheckCircle color="green" />
          <Text fontSize="2xl">
            An activation link has been sent to {getValues('email')} or click{' '}
            <NextLink href="/login" passHref>
              <Link color="blue">here</Link>
            </NextLink>{' '}
            to login.
          </Text>

          <Button
            colorScheme="purple"
            onClick={() => console.log('coming soon')}
          >
            Resend Link
          </Button>
        </>
      ) : (
        <Grid
          templateColumns="repeat(5, 1fr)"
          as="form"
          onSubmit={handleSubmit(handleSignup)}
          gap="5"
        >
          <GridItem colSpan={5}>
            <FormField
              errorMessage={errors?.firstName?.message}
              htmlFor="firstName"
              label="First Name"
            >
              <Input
                id="firstName"
                placeholder="First Name"
                {...register('firstName', {
                  required: 'First Name is required'
                })}
                type="text"
              />
            </FormField>
          </GridItem>
          <GridItem colSpan={5}>
            <FormField
              label="Last Name"
              errorMessage={errors?.lastName?.message}
              htmlFor="lastName"
            >
              <Input
                id="lastName"
                placeholder="Last name"
                {...register('lastName', {
                  required: 'Last name is requred'
                })}
                type="text"
              />
            </FormField>
          </GridItem>
          <GridItem colSpan={5}>
            <FormField
              label="Phone Number"
              errorMessage={errors?.phoneNumber?.message}
              htmlFor="phoneNumber"
            >
              <Grid gap={2} templateColumns="repeat(5, 1fr)">
                <GridItem colSpan={1}>
                  <Select
                    w="36"
                    bg="white"
                    {...register('countryCode', {
                      required: true
                    })}
                  >
                    <option value="+1">US +1</option>
                  </Select>
                </GridItem>

                <GridItem colSpan={3}>
                  <InputGroup>
                    <Input
                      type="tel"
                      placeholder="Phone number"
                      id="phoneNumber"
                      {...register('phoneNumber', {
                        required: 'Phone number is required',
                        pattern: {
                          message: 'Please enter a valid phone number',
                          value:
                            /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
                        }
                      })}
                    />
                    {isVerified && (
                      <InputRightElement>
                        <FiCheck color="green" />
                      </InputRightElement>
                    )}
                  </InputGroup>
                </GridItem>
                <GridItem colSpan={1}>
                  <VerifyNumberFormPopup
                    isDisabled={disableVerifyBtn}
                    numToVerify={`${getValues('countryCode')}${getValues(
                      'phoneNumber'
                    )}`}
                    onVerificationComplete={() => {
                      setIsVerified(true)
                      resetField('phoneNumber', {
                        defaultValue: getValues('phoneNumber')
                      })
                    }}
                  />
                </GridItem>
              </Grid>
            </FormField>
          </GridItem>

          <GridItem colSpan={5}>
            <FormField
              label="Email"
              htmlFor="email"
              errorMessage={errors?.email?.message}
            >
              <Input
                id="email"
                placeholder="Email"
                {...register('email', {
                  required: 'Email is requred'
                })}
                type="email"
              />
            </FormField>
          </GridItem>
          <GridItem colSpan={5}>
            <FormField
              label="Password"
              htmlFor="password"
              errorMessage={errors?.password?.message}
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
                    onClick={() =>
                      setShowPassword(showPassword => !showPassword)
                    }
                  >
                    {showPassword ? <FiEye /> : <FiEyeOff />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormField>
          </GridItem>
          <GridItem colSpan={5}>
            <FormField
              label="Confirm Password"
              errorMessage={errors?.confirmPassword?.message}
              htmlFor="confirmPassword"
            >
              <Input
                id="confirmPassword"
                placeholder="Confirm password"
                {...register('confirmPassword', {
                  required: 'Confirm password is required'
                })}
                type="password"
              />
            </FormField>
          </GridItem>

          <GridItem colSpan={5}>
            <Button colorScheme="purple" isFullWidth type="submit">
              Create Account
            </Button>
          </GridItem>
          <GridItem colSpan={6}>
            <Text as="sub">
              Already have an account?{' '}
              <NextLink href="/login" passHref>
                <Link color="blue.500">Login</Link>
              </NextLink>{' '}
            </Text>
          </GridItem>
        </Grid>
      )}
    </>
  )
}

Signup.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <BasicLayout
      headerText="Sign Up"
      subText="Never miss another important moment again"
    >
      {page}
    </BasicLayout>
  )
}

export default Signup
