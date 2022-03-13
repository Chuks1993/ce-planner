import router, { useRouter } from 'next/router'
import NextLink from 'next/link'
import { Heading, Divider, Button } from 'ui'
import { NavLink } from '@src/types'

export const SideBar = ({ links }: { links: NavLink[] }) => {
  const router = useRouter()
  return (
    <>
      <Heading>CE Planner</Heading>
      <Divider />
      {links.map(link => {
        const isCurrPath = router.pathname === link.to
        return (
          <NextLink href={link.to} key={link.name}>
            <Button
              bg={isCurrPath ? 'white' : null}
              size="lg"
              aria-label="Home"
              color={isCurrPath ? 'black' : 'gray.400'}
              leftIcon={link.icon}
              variant={'ghost'}
              boxShadow={isCurrPath ? 'rgb(0 0 0 / 4%) 0px 7px 11px' : null}
              isFullWidth
              iconSpacing="5"
              rounded="xl"
            >
              {/* {link.icon} */}
              {link.name}
            </Button>
          </NextLink>
        )
      })}
    </>
  )
}
