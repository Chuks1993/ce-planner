import { User, useUpdateUserMutation } from '@src/graphql/generated'
import * as React from 'react'
import { DashboardLayout } from '@src/layouts'
import { useForm } from 'react-hook-form'
import {
  Grid,
  GridItem,
  Input,
  Select,
  Button,
  useToast,
  FormField,
  FiPlus,
  useDisclosure
} from 'ui'
import { AddPhoneNumberForm } from '@src/components'
import { useQueryClient } from 'react-query'

type AccountProps = {
  me: User
}

const Account = ({ me }: AccountProps) => {
  const toast = useToast()
  const queryClient = useQueryClient()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isDirty }
  } = useForm({
    defaultValues: {
      firstName: me.firstName,
      lastName: me.lastName,
      email: me.email,
      defaultNumber: me.defaultNumber
    }
  })
  const [isEditting, setIsEditting] = React.useState(false)
  const { mutate: updateUser } = useUpdateUserMutation()
  const onSubmit = input => {
    updateUser(
      { input },
      {
        onSettled: ({ updateUser }) => {
          if (updateUser.error) {
            toast({
              title: 'Account was not updated',
              position: 'top-right',
              status: 'error',
              duration: 9000,
              isClosable: true
            })
            return
          }
          queryClient.invalidateQueries('me')
          toast({
            title: 'Account updated',
            position: 'top-right',
            status: 'success',
            duration: 9000,
            isClosable: true
          })
        }
      }
    )
  }

  const onButtonClick = () => {
    if (!isEditting) {
      // Initiating edit
      setIsEditting(true)
    } else {
      // Canceling edit
      reset()
      setIsEditting(false)
    }
  }
  return (
    <>
      <Grid
        gap="5"
        templateColumns="repeat(4, 1fr)"
        maxW="50%"
        as="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <GridItem colSpan={2}>
          <FormField
            label="First Name"
            htmlFor="firstName"
            errorMessage={errors?.firstName?.message}
          >
            <Input
              id="firstName"
              placeholder="First Name"
              {...register('firstName', {
                required: 'First Name is required'
              })}
              type="text"
              disabled={!isEditting}
            />
          </FormField>
        </GridItem>
        <GridItem colSpan={2}>
          <FormField
            label="Last Name"
            htmlFor="lastName"
            errorMessage={errors?.lastName?.message}
          >
            <Input
              id="lastName"
              placeholder="Last name"
              {...register('lastName', {
                required: 'Last name is required'
              })}
              type="text"
              disabled={!isEditting}
            />
          </FormField>
        </GridItem>
        <GridItem colSpan={4}>
          <FormField
            label="Email"
            htmlFor="email"
            errorMessage={errors?.email?.message}
          >
            <Input
              id="email"
              placeholder="Email"
              {...register('email', {
                required: 'Email is required'
              })}
              type="email"
              disabled={!isEditting}
            />
          </FormField>
        </GridItem>
        <GridItem colSpan={3}>
          <FormField
            label="Default Number"
            htmlFor="defaultNumber"
            errorMessage={errors?.defaultNumber?.message}
          >
            <Select
              name="defaultNumber"
              id="defaultNumber"
              {...register('defaultNumber', {
                required: 'A defualt number is required'
              })}
              disabled={!isEditting}
            >
              {me.phoneNumbers.map(num => {
                return (
                  <option key={num.number} value={num.number}>
                    {num.number}
                  </option>
                )
              })}
            </Select>
          </FormField>
        </GridItem>
        <GridItem alignSelf="end" colSpan={1}>
          {/* <AddPhoneNumberForm currentUser={me} isDisabled={!isEditting} /> */}
          <Button
            ml="5"
            rightIcon={<FiPlus />}
            colorScheme="green"
            isDisabled={!isEditting}
            onClick={onOpen}
          >
            Add Number
          </Button>
        </GridItem>

        <GridItem colSpan={2}>
          <Button
            colorScheme={!isEditting ? null : 'red'}
            onClick={onButtonClick}
            isFullWidth
          >
            {!isEditting ? 'Edit' : 'Cancel'}
          </Button>
        </GridItem>
        <GridItem colSpan={2}>
          <Button
            isDisabled={!isEditting || !isDirty}
            colorScheme="green"
            isFullWidth
            type="submit"
          >
            Save
          </Button>
        </GridItem>
      </Grid>
      <AddPhoneNumberForm
        currentUserPhoneNums={me?.phoneNumbers}
        isOpen={isOpen}
        onClose={onClose}
        onOpen={onOpen}
        onComplete={() => queryClient.invalidateQueries('me')}
      />
    </>
  )
}

Account.getLayout = function getLayout(page: React.ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>
}

export default Account
