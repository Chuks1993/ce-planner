import { useForm } from 'react-hook-form'
import {
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  Input,
  Select,
  Stack,
  Text
} from 'ui'

const Landing = () => {
  const {
    register,
    handleSubmit,
    formState: { isDirty, errors }
  } = useForm()

  const onSubmit = data => {
    console.log(data)
  }
  return (
    <Stack p="5" bg="#B794F4" minH="100vh">
      <Heading>CE Planner</Heading>
      <Flex flexDir="column" alignItems="center" justify="center" flexGrow="1">
        <Heading mb="10">Never miss another important moment again.</Heading>
        <Grid
          gap="2"
          templateColumns="repeat(5, 1fr)"
          as="form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <GridItem colSpan={1}>
            <Select
              bg="white"
              size="lg"
              defaultValue="+1"
              {...register('countryCode', {
                required: true
              })}
            >
              <option value="+1">US +1</option>
            </Select>
          </GridItem>
          <GridItem colSpan={3}>
            <Input
              bg="white"
              size="lg"
              placeholder="Phone Number"
              id="phoneNumber"
              {...register('phoneNumber', {
                required: 'Please enter a phone number',
                pattern: {
                  message: 'Please enter a valid phone number',
                  value:
                    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
                }
              })}
            />
            {errors?.phoneNumber && (
              <Text color="red">{errors?.phoneNumber.message}</Text>
            )}
          </GridItem>
          <GridItem colSpan={1}>
            <Button
              type="submit"
              isDisabled={!isDirty}
              //   colorScheme="blackAlpha"
              size="lg"
            >
              Submit
            </Button>
          </GridItem>
        </Grid>
      </Flex>
    </Stack>
  )
}

export default Landing
