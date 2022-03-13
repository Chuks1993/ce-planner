import {
  ActivateAccountDocument,
  ActivateAccountMutation,
  ActivateAccountMutationVariables
} from '@src/graphql/generated'
import { BasicLayout } from '@src/layouts'
import { gqlClient } from '@src/utils'
import NextLink from 'next/link'
import type { GetStaticPaths, GetStaticPropsContext } from 'next/types'
import { Container, FiCheckCircle, Text, Link } from 'ui'

const ActivateAccount = ({ error }) => {
  if (error) return <div>{error}</div>
  return (
    <>
      <FiCheckCircle color="green" />
      <Text textAlign="center" fontSize="2xl">
        Your email has been successfully veified. You can close this page or
        click{' '}
        <NextLink href="/login" passHref>
          <Link color="blue">here</Link>
        </NextLink>{' '}
        to login.
      </Text>
    </>
  )
}

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: 'blocking' //indicates the type of fallback
  }
}

export async function getStaticProps(ctx: GetStaticPropsContext) {
  const token = ctx.params.token as string
  const { activateAccount: { data, error } = {} } = await gqlClient<
    ActivateAccountMutation,
    ActivateAccountMutationVariables
  >(ActivateAccountDocument, { token })()
  return {
    props: {
      data,
      error
    }
  }
}

ActivateAccount.getLayout = function getLayout(page: React.ReactElement) {
  return <BasicLayout>{page}</BasicLayout>
}

export default ActivateAccount
