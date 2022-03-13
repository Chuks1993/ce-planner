import * as React from 'react'
import {
  Button,
  ButtonGroup,
  ButtonProps,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Popover,
  PopoverArrow,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  useDisclosure
} from 'ui'
import FocusLock from 'react-focus-lock'
import { useForm } from 'react-hook-form'
import {
  useSendVerificationCodeMutation,
  useVerifyCodeMutation
} from '@src/graphql/generated'

type VerifyNumberFormPopupProps = {
  onVerificationComplete: () => void
  numToVerify: string
} & ButtonProps

export const VerifyNumberFormPopup = ({
  onVerificationComplete,
  numToVerify,
  ...rest
}: VerifyNumberFormPopupProps) => {
  const [value, setValue] = React.useState('')
  const { onOpen, onClose, isOpen } = useDisclosure()
  const firstFieldRef = React.useRef(null)
  const {
    mutate: sendCode,
    data: { sendVerificationCode: { data: sid } = {} } = {}
  } = useSendVerificationCodeMutation()
  const { mutate: verifyCode } = useVerifyCodeMutation()
  const {} = useForm()
  const onSubmit = () => {
    verifyCode(
      { input: { code: value, sendTo: numToVerify, sid } },
      {
        onSettled: ({ verifyCode }) => {
          // TODO: Improve error handling
          if (verifyCode.error) return console.log('something went wrong')
          onVerificationComplete()
        }
      }
    )
    setValue('')
    onClose()
  }
  return (
    <>
      <Popover
        isOpen={isOpen}
        initialFocusRef={firstFieldRef}
        onOpen={onOpen}
        onClose={onClose}
        placement="right"
        closeOnBlur={false}
      >
        <PopoverTrigger>
          <Button
            onClick={() => sendCode({ input: { phoneNumber: numToVerify } })}
            colorScheme="green"
            isFullWidth
            {...rest}
          >
            Verify
          </Button>
        </PopoverTrigger>
        <PopoverContent p={5}>
          <FocusLock returnFocus persistentFocus={false}>
            <PopoverArrow />
            <PopoverCloseButton />
            <FormControl>
              <FormLabel htmlFor="code">Verification Code</FormLabel>
              <Input
                value={value}
                onChange={e => setValue(e.target.value)}
                ref={firstFieldRef}
                id="code"
              />
              <FormHelperText>Enter code sent to the number</FormHelperText>
            </FormControl>
          </FocusLock>
          <ButtonGroup mt="5" d="flex" justifyContent="flex-end">
            <Button onClick={onClose} colorScheme="red">
              Close
            </Button>
            <Button
              colorScheme="green"
              isDisabled={value === ''}
              onClick={onSubmit}
            >
              Submit
            </Button>
          </ButtonGroup>
        </PopoverContent>
      </Popover>
    </>
  )
}
