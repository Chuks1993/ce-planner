import { Box, Container, Heading, Stack, Text } from 'ui'
import type { ReactNode } from 'react'

type BasicLayoutProps = {
  children: ReactNode
  headerText?: string
  subText?: string
}

export const BasicLayout = ({
  children,
  headerText,
  subText
}: BasicLayoutProps) => {
  return (
    <Container minH="100vh" p="10">
      <Stack spacing="5">
        <Box>
          {headerText && (
            <Heading as="h2" fontSize="3xl">
              {headerText}
            </Heading>
          )}
          {subText && <Text as="sub">{subText}</Text>}
        </Box>
        {/* <Button leftIcon={<FcGoogle />} variant="outline" isFullWidth>
          Sign in with Google
        </Button>
        <TextDivider text="or" /> */}
        {children}
      </Stack>
    </Container>
  )
}
