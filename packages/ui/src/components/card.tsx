import type { ReactNode } from 'react'
import { Box, useColorModeValue } from '@chakra-ui/react'

export const Card = ({ children, ...rest }: { children: ReactNode }) => {
  const bgColor = useColorModeValue('white', 'gray.700')
  return (
    <Box rounded={'lg'} bg={bgColor} boxShadow={'lg'} p={8} {...rest}>
      {children}
    </Box>
  )
}
