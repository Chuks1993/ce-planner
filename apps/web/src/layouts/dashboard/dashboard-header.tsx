import { useLogoutUserMutation, User } from '@src/graphql/generated'
import router from 'next/router'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  FiLogOut,
  FiUser,
  Link,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList
} from 'ui'

import NextLink from 'next/link'

type DashboardHeaderProps = {
  me: User
}

export const DashboardHeader = ({ me }: DashboardHeaderProps) => {
  const { mutate: logout } = useLogoutUserMutation()
  return (
    <>
      <Breadcrumb flexGrow={1}>
        <BreadcrumbItem>
          <BreadcrumbLink href="/" isCurrentPage={router.pathname === '/'}>
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>
        {/* 
        <BreadcrumbItem>
          <BreadcrumbLink
            isCurrentPage={router.pathname === '/reminders'}
            href="#"
          >
            Reminders
          </BreadcrumbLink>
        </BreadcrumbItem> */}
      </Breadcrumb>
      <Menu>
        <MenuButton
          color="gray.500"
          fontWeight="extrabold"
          as={Button}
          variant={'link'}
          rightIcon={<FiUser />}
        >
          {me.firstName} {me.lastName}
        </MenuButton>
        <MenuList>
          <NextLink href="/account" passHref>
            <MenuItem as={Link}>Account</MenuItem>
          </NextLink>
          <MenuDivider />
          <MenuItem
            icon={<FiLogOut />}
            color="red"
            onClick={() =>
              logout(null, { onSettled: () => router.push('/login') })
            }
          >
            Logout
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  )
}
