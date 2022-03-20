import { useCreateReminderMutation } from '@src/graphql/generated'
import { useSession } from '@src/lib/react-query-auth'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useQueryClient } from 'react-query'
import {
  useDisclosure,
  IconButton,
  FiPlus,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Input,
  ModalFooter,
  Button,
  Stack,
  FormField,
  Select
} from 'ui'

export const AddReminderForm = () => {
  // TODO: fix tommorrow and today
  // const today = new Date()
  // const tomorrow = new Date(today).toJSON().slice(0, 19)
  const queryClient = useQueryClient()
  const { mutate: createReminder } = useCreateReminderMutation()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [me] = useSession({ required: true })
  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty, errors }
  } = useForm({
    defaultValues: {
      eventTitle: '',
      eventCelebrant: '',
      // TODO: Make this date tommorrow
      // sendAt: tomorrow,
      sendAt: '',
      phoneNumber: me?.defaultNumber
    }
  })
  const onSubmit = input => {
    if (typeof me === 'boolean') return
    createReminder(
      {
        input
      },
      {
        onSettled: data => {
          if (data.createReminder.data) {
            queryClient.invalidateQueries('reminders')
            reset()
            onClose()
            return
          }
        }
      }
    )
  }
  return (
    <>
      <IconButton
        colorScheme="green"
        size="xs"
        isRound
        aria-label="add reminder"
        icon={<FiPlus />}
        onClick={onOpen}
      />
      {me && (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader>Add Reminder</ModalHeader>
            <ModalCloseButton />
            <ModalBody as={Stack}>
              <FormField
                label="Event"
                htmlFor="eventTitle"
                errorMessage={errors?.eventTitle?.message}
              >
                <Input
                  placeholder="Birthday, wedding, anniversary..."
                  id="eventTitle"
                  {...register('eventTitle', {
                    required: "Please enter the event's title"
                  })}
                />
              </FormField>
              <FormField
                errorMessage={errors?.eventCelebrant?.message}
                htmlFor="celebrantsName"
                label="Celebrant's Name"
              >
                <Input
                  placeholder="James Doe"
                  id="eventCelebrant"
                  {...register('eventCelebrant', {
                    required: "Please enter the celebrant's name"
                  })}
                />
              </FormField>

              <FormField
                label="Phone Number"
                errorMessage={errors?.phoneNumber?.message}
                htmlFor="phoneNumber"
              >
                <Select
                  name="phoneNumber"
                  id="phoneNumber"
                  {...register('phoneNumber', {
                    required: 'Phone number is required'
                  })}
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
              <FormField
                label="Date"
                htmlFor="date"
                errorMessage={errors?.sendAt?.message}
              >
                <Input
                  id="sendAt"
                  type="datetime-local"
                  // min={tommorrow}
                  {...register('sendAt', {
                    required: 'Please enter a date for the event'
                  })}
                />
              </FormField>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="red" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button isDisabled={!isDirty} colorScheme="green" type="submit">
                Submit
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </>
  )
}
