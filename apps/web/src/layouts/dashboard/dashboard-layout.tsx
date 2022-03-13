import * as React from 'react'
import { useSession } from '@src/lib/react-query-auth'
import { Grid, GridItem, Stack, Flex, FiHome, FiUser } from 'ui'
import { SideBar, RemindersTable } from '@src/components'
import { DashboardHeader } from './dashboard-header'
import { NavLink } from '@src/types'

const links: NavLink[] = [
  { name: 'Home', to: '/', icon: <FiHome /> },
  { name: 'Account', to: '/account', icon: <FiUser /> }
]

export const DashboardLayout = ({
  children
}: {
  children: React.ReactNode
}) => {
  const [me, isUserLoading] = useSession({ required: true })
  if (!me || isUserLoading) return <div>loading...</div>

  return (
    <Grid
      templateRows="auto repeat(2, 1fr)"
      templateColumns="repeat(5, 1fr)"
      gap={4}
      p="10"
      minH="100vh"
      bg="gray.200"
    >
      <GridItem as={Stack} spacing="5" rowSpan={3} colSpan={1}>
        <SideBar links={links} />
      </GridItem>
      <GridItem
        h="fit-content"
        as={Flex}
        rowSpan={1}
        colSpan={4}
        justifyContent="end"
      >
        <DashboardHeader me={me} />
      </GridItem>

      <GridItem bgColor="white" rounded="lg" p="10" colSpan={4} rowSpan={2}>
        {React.Children.map(children, child => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, { me })
          }
          return child
        })}
      </GridItem>
    </Grid>
  )
}
