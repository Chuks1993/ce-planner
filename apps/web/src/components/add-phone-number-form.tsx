import {
  PhoneNumber,
  useSendVerificationCodeMutation,
  useVerifyCodeMutation
} from '@src/graphql/generated'
import React from 'react'
import { useForm } from 'react-hook-form'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Text,
  Input,
  ModalFooter,
  Button,
  Select,
  Grid,
  GridItem,
  HStack,
  FiCheckCircle,
  FormField
} from 'ui'

type Steps = {
  [key: string]: {
    onNext?: (input: any, sid?: string) => void
    onBack?: () => void
    backText?: string
    nextText?: string
    component: JSX.Element
  }
}

type AddPhoneNumberFormProps = {
  currentUserPhoneNums: PhoneNumber[]
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
  onComplete: () => void
}

const AddPhoneNumberForm = ({
  // currentUserPhoneNums,
  isOpen,
  // onOpen,
  onClose,
  onComplete
}: AddPhoneNumberFormProps) => {
  const closeModal = () => {
    reset()
    setStep(AddNumSteps.INPUT_NUMBER)
    onClose()
  }
  const InputNumber = () => {
    return (
      <>
        <GridItem colSpan={4}>
          <FormField htmlFor="countryCode">
            <Select
              bg="white"
              defaultValue="+1"
              {...register('countryCode', {
                required: true
              })}
            >
              <option value="+1">US +1</option>
            </Select>
          </FormField>
        </GridItem>
        <GridItem colSpan={8}>
          <FormField
            errorMessage={errors?.phoneNumber?.message}
            htmlFor="phoneNumber"
          >
            <Input
              bg="white"
              placeholder="Phone Number"
              id="phoneNumber"
              type="tel"
              {...register('phoneNumber', {
                required: 'Please enter a phone number',
                pattern: {
                  message: 'Please enter a valid phone number',
                  value:
                    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
                }
              })}
            />
          </FormField>
        </GridItem>
      </>
    )
  }

  const InputCode = () => {
    return (
      <GridItem colSpan={6}>
        <FormField htmlFor="code">
          <Input
            bg="white"
            size="lg"
            placeholder="Code"
            id="code"
            type="text"
            {...register('code', {
              required: 'Please enter a valid code'
            })}
          />
        </FormField>
      </GridItem>
    )
  }

  const SuccessfulVerification = () => {
    return (
      <GridItem colSpan={12}>
        <HStack>
          <FiCheckCircle color="green" />
          <Text as="p">Your number has been successfully added!</Text>
        </HStack>
      </GridItem>
    )
  }

  const AddNumSteps: Steps = {
    INPUT_NUMBER: {
      onBack: closeModal,
      backText: 'Close',
      onNext: (input, _) => {
        // const numIsAlreadyDefault = currentUserPhoneNums.find(
        //   num => num.number === `${input.countryCode}${input.phoneNumber}`
        // )
        // if (numIsAlreadyDefault)
        //   return setError('phoneNumber', {
        //     type: 'pattern',
        //     message:
        //       'Add a different number that is not already in your account'
        //   })
        sendVerificationCode(
          {
            input: { phoneNumber: `${input.countryCode}${input.phoneNumber}` }
          },
          {
            onSettled: ({ sendVerificationCode }) => {
              if (sendVerificationCode.error)
                return setError('phoneNumber', {
                  type: 'validate',
                  message: sendVerificationCode.error
                })
            }
          }
        )
        setStep(AddNumSteps.INPUT_CODE)
      },
      nextText: 'Send Code',
      component: <InputNumber />
    },
    INPUT_CODE: {
      onBack: () => setStep(AddNumSteps.INPUT_NUMBER),
      backText: 'Back',
      onNext: (input, sid) => {
        if (!sid) return
        verifyCode({
          input: {
            code: input.code,
            sid,
            sendTo: `${input.countryCode}${input.phoneNumber}`,
            verifyAndAdd: true
          }
        })
      },
      nextText: 'Submit',
      component: <InputCode />
    },
    SUCCESSFUL_VERIFICATION: {
      onBack: closeModal,
      backText: 'Close',
      component: <SuccessfulVerification />
    }
  }
  const [step, setStep] = React.useState(AddNumSteps.INPUT_NUMBER)

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { isDirty, errors }
  } = useForm()
  const {
    mutate: sendVerificationCode,
    data: { sendVerificationCode: { data: sid } = {} } = {}
  } = useSendVerificationCodeMutation()
  const { mutate: verifyCode } = useVerifyCodeMutation({
    onSettled: ({ verifyCode: res }) => {
      if (res.error)
        return setError('code', {
          type: 'validate',
          message: res.error
        })
      setStep(AddNumSteps.SUCCESSFUL_VERIFICATION)
    }
  })
  React.useEffect(() => {
    if (step === AddNumSteps.SUCCESSFUL_VERIFICATION) {
      onComplete()
    }
  })
  const onSubmit = input => {
    step.onNext(input, sid)
  }

  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      <ModalOverlay />
      <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
        <ModalHeader>Add Number</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Grid gap="2" templateColumns="repeat(12, 1fr)">
            {step.component}
          </Grid>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="red" mr={3} onClick={step.onBack}>
            {step.backText}
          </Button>
          {step.onNext && (
            <Button isDisabled={!isDirty} colorScheme="green" type="submit">
              {step.nextText}
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export { AddPhoneNumberForm }
