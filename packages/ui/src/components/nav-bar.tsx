import { Button, HStack } from '@chakra-ui/react'
import { useRouter } from 'next/router'

export const NavBar = () => {
  const router = useRouter()
  const handleButtonClick = () => {}
  return (
    <HStack m="10" spacing="10">
      <Button
        onClick={handleButtonClick}
        disabled={router.pathname === '/login'}
      ></Button>
      <Button
        variant="link"
        disabled={router.pathname === '/'}
        onClick={() => router.push('/')}
      >
        Home
      </Button>
    </HStack>
  )
}
