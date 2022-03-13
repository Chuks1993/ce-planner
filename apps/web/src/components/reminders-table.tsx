import {
  RemindersQuery,
  RemindersQueryVariables,
  RemindersDocument,
  useRemindersQuery,
  useDeleteReminderMutation
} from '@src/graphql/generated'
import { gqlClient } from '@src/utils'
import { useQueryClient } from 'react-query'
import {
  HStack,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  IconButton,
  FiTrash2,
  Text,
  useToast
} from 'ui/src'
import { AddReminderForm } from '.'

export const RemindersTable = props => {
  const toast = useToast()
  const queryClient = useQueryClient()
  const { data: { reminders: { data: reminders } = {} } = {}, isLoading } =
    useRemindersQuery(null, { initialData: props.reminders })
  const { mutate: deleteReminder } = useDeleteReminderMutation({
    onSettled: ({ deleteReminder }) => {
      if (deleteReminder.error) {
        toast({
          title: 'Delete unsuccessful',
          position: 'top-right',
          status: 'error',
          duration: 9000,
          isClosable: true
        })
        return
      }

      queryClient.invalidateQueries('reminders')
      toast({
        title: 'Reminder deleted',
        position: 'top-right',
        status: 'success',
        duration: 9000,
        isClosable: true
      })
    }
  })
  if (isLoading) return <div>loading</div>
  return (
    <>
      <HStack align="center" mb="5">
        <Text fontWeight="bold" fontSize="2xl" as="h3">
          Reminders
        </Text>
        <AddReminderForm />
      </HStack>
      <Table variant="simple">
        {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
        <Thead>
          <Tr>
            <Th>Title</Th>
            <Th>Scheduled Date</Th>
            <Th>Number</Th>
            <Th />
          </Tr>
        </Thead>
        <Tbody>
          {reminders?.map(reminder => (
            <Tr key={reminder.id}>
              <Td>
                {reminder.eventCelebrant}&apos;s {reminder.eventTitle}
              </Td>
              <Td>{new Date(reminder.sendAt).toDateString()}</Td>
              <Td>{reminder.sendTo}</Td>
              <Td>
                {/* <ReminderForm reminder={reminder} /> */}
                <IconButton
                  isRound
                  variant="outline"
                  colorScheme="red"
                  aria-label="Delete Reminder"
                  size="lg"
                  icon={<FiTrash2 />}
                  onClick={() =>
                    deleteReminder({ input: { reminderId: reminder.id } })
                  }
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </>
  )
}

export async function getServerSideProps() {
  const { reminders: { data } = {} } = await gqlClient<
    RemindersQuery,
    RemindersQueryVariables
  >(RemindersDocument)()
  return {
    props: {
      reminders: data
    }
  }
}
