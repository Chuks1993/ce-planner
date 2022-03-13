import { Divider, Flex, HStack, Text } from '@chakra-ui/react'

type TextDividerProps = {
  text: string
}

export const TextDivider = ({ text }: TextDividerProps) => {
  return (
    <HStack w="full" my="5" justify="space-between">
      <Divider flexBasis="45%" />
      <Text color="gray.500">{text}</Text>
      <Divider flexBasis="45%" />
    </HStack>
  )
}
