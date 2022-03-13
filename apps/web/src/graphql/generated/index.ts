/* eslint-disable */
import {
  useQuery,
  UseQueryOptions,
  useMutation,
  UseMutationOptions
} from 'react-query'
import { gqlClient } from 'src/utils'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  DateTime: any
}

export type ActivateAccountResult = {
  __typename?: 'ActivateAccountResult'
  data?: Maybe<Scalars['Boolean']>
  error?: Maybe<Scalars['String']>
}

export type CreateReminderInput = {
  eventCelebrant: Scalars['String']
  eventTitle: Scalars['String']
  phoneNumber: Scalars['String']
  sendAt: Scalars['DateTime']
}

export type CreateReminderResult = {
  __typename?: 'CreateReminderResult'
  data?: Maybe<Reminder>
  error?: Maybe<Scalars['String']>
}

export type CreateUserInput = {
  email: Scalars['String']
  firstName: Scalars['String']
  lastName: Scalars['String']
  password: Scalars['String']
  phoneNumber: Scalars['String']
}

export type CreateUserResult = {
  __typename?: 'CreateUserResult'
  data?: Maybe<Scalars['Boolean']>
  error?: Maybe<Scalars['String']>
}

export type DeleteReminderInput = {
  reminderId: Scalars['String']
}

export type DeleteReminderResult = {
  __typename?: 'DeleteReminderResult'
  data?: Maybe<Scalars['Boolean']>
  error?: Maybe<Scalars['String']>
}

export type ForgetPasswordInput = {
  email: Scalars['String']
}

export type ForgetPasswordResult = {
  __typename?: 'ForgetPasswordResult'
  data?: Maybe<Scalars['Boolean']>
  error?: Maybe<Scalars['String']>
}

export type LoginUserInput = {
  email: Scalars['String']
  password: Scalars['String']
  rememberMe?: InputMaybe<Scalars['Boolean']>
}

export type Mutation = {
  __typename?: 'Mutation'
  activateAccount: ActivateAccountResult
  createReminder: CreateReminderResult
  createUser: CreateUserResult
  deleteReminder: DeleteReminderResult
  forgetPassword: ForgetPasswordResult
  loginUser: UserResult
  logoutUser: Scalars['Boolean']
  resetPassword: ResetPasswordResult
  sendVerificationCode: SendVerificationCodeResult
  updateUser: UpdateUserResult
  verifyCode: VerifyCodeResult
}

export type MutationActivateAccountArgs = {
  token: Scalars['String']
}

export type MutationCreateReminderArgs = {
  input: CreateReminderInput
}

export type MutationCreateUserArgs = {
  input: CreateUserInput
}

export type MutationDeleteReminderArgs = {
  input: DeleteReminderInput
}

export type MutationForgetPasswordArgs = {
  input: ForgetPasswordInput
}

export type MutationLoginUserArgs = {
  input: LoginUserInput
}

export type MutationResetPasswordArgs = {
  input: ResetPasswordInput
}

export type MutationSendVerificationCodeArgs = {
  input: SendVerificationCodeInput
}

export type MutationUpdateUserArgs = {
  input: UpdateUserInput
}

export type MutationVerifyCodeArgs = {
  input: VerifyCodeInput
}

export type PhoneNumber = {
  __typename?: 'PhoneNumber'
  number: Scalars['ID']
}

export type Query = {
  __typename?: 'Query'
  me?: Maybe<User>
  reminders: RemindersResult
}

export type Reminder = {
  __typename?: 'Reminder'
  body: Scalars['String']
  createdAt: Scalars['DateTime']
  eventCelebrant: Scalars['String']
  eventTitle: Scalars['String']
  id: Scalars['ID']
  sendAt: Scalars['DateTime']
  sendTo: Scalars['String']
  sid: Scalars['String']
  status: Scalars['String']
  updatedAt?: Maybe<Scalars['DateTime']>
  user: User
}

export type RemindersResult = {
  __typename?: 'RemindersResult'
  data?: Maybe<Array<Maybe<Reminder>>>
  error?: Maybe<Scalars['String']>
}

export type ResetPasswordInput = {
  password: Scalars['String']
  token: Scalars['String']
}

export type ResetPasswordResult = {
  __typename?: 'ResetPasswordResult'
  data?: Maybe<Scalars['Boolean']>
  error?: Maybe<Scalars['String']>
}

export type SendVerificationCodeInput = {
  phoneNumber: Scalars['String']
}

export type SendVerificationCodeResult = {
  __typename?: 'SendVerificationCodeResult'
  data?: Maybe<Scalars['String']>
  error?: Maybe<Scalars['String']>
}

export type UpdateUserInput = {
  defaultNumber: Scalars['String']
  email: Scalars['String']
  firstName: Scalars['String']
  lastName: Scalars['String']
}

export type UpdateUserResult = {
  __typename?: 'UpdateUserResult'
  data?: Maybe<User>
  error?: Maybe<Scalars['String']>
}

export type User = {
  __typename?: 'User'
  defaultNumber?: Maybe<Scalars['String']>
  email: Scalars['String']
  firstName?: Maybe<Scalars['String']>
  id: Scalars['ID']
  lastName?: Maybe<Scalars['String']>
  phoneNumbers?: Maybe<Array<Maybe<PhoneNumber>>>
  reminders?: Maybe<Array<Maybe<Reminder>>>
}

export type UserResult = {
  __typename?: 'UserResult'
  data?: Maybe<User>
  error?: Maybe<Scalars['String']>
}

export type VerifyCodeInput = {
  code: Scalars['String']
  sendTo: Scalars['String']
  sid: Scalars['String']
  verifyAndAdd?: InputMaybe<Scalars['Boolean']>
}

export type VerifyCodeResult = {
  __typename?: 'VerifyCodeResult'
  data?: Maybe<Scalars['Boolean']>
  error?: Maybe<Scalars['String']>
}

export type ReminderDetailsFragment = {
  __typename?: 'Reminder'
  id: string
  body: string
  eventTitle: string
  eventCelebrant: string
  sendAt: any
  sendTo: string
  status: string
  sid: string
  createdAt: any
  updatedAt?: any | null
}

export type RemindersQueryVariables = Exact<{ [key: string]: never }>

export type RemindersQuery = {
  __typename?: 'Query'
  reminders: {
    __typename?: 'RemindersResult'
    error?: string | null
    data?: Array<{
      __typename?: 'Reminder'
      id: string
      body: string
      eventTitle: string
      eventCelebrant: string
      sendAt: any
      sendTo: string
      status: string
      sid: string
      createdAt: any
      updatedAt?: any | null
    } | null> | null
  }
}

export type SendVerificationCodeMutationVariables = Exact<{
  input: SendVerificationCodeInput
}>

export type SendVerificationCodeMutation = {
  __typename?: 'Mutation'
  sendVerificationCode: {
    __typename?: 'SendVerificationCodeResult'
    data?: string | null
    error?: string | null
  }
}

export type VerifyCodeMutationVariables = Exact<{
  input: VerifyCodeInput
}>

export type VerifyCodeMutation = {
  __typename?: 'Mutation'
  verifyCode: {
    __typename?: 'VerifyCodeResult'
    data?: boolean | null
    error?: string | null
  }
}

export type CreateReminderMutationVariables = Exact<{
  input: CreateReminderInput
}>

export type CreateReminderMutation = {
  __typename?: 'Mutation'
  createReminder: {
    __typename?: 'CreateReminderResult'
    error?: string | null
    data?: {
      __typename?: 'Reminder'
      id: string
      body: string
      eventTitle: string
      eventCelebrant: string
      sendAt: any
      sendTo: string
      status: string
      sid: string
      createdAt: any
      updatedAt?: any | null
    } | null
  }
}

export type DeleteReminderMutationVariables = Exact<{
  input: DeleteReminderInput
}>

export type DeleteReminderMutation = {
  __typename?: 'Mutation'
  deleteReminder: {
    __typename?: 'DeleteReminderResult'
    data?: boolean | null
    error?: string | null
  }
}

export type PhoneNumberDetailFragment = {
  __typename?: 'PhoneNumber'
  number: string
}

export type UserDetailFragment = {
  __typename?: 'User'
  id: string
  email: string
  firstName?: string | null
  lastName?: string | null
  defaultNumber?: string | null
  phoneNumbers?: Array<{
    __typename?: 'PhoneNumber'
    number: string
  } | null> | null
}

export type CreateUserMutationVariables = Exact<{
  input: CreateUserInput
}>

export type CreateUserMutation = {
  __typename?: 'Mutation'
  createUser: {
    __typename?: 'CreateUserResult'
    data?: boolean | null
    error?: string | null
  }
}

export type LoginUserMutationVariables = Exact<{
  input: LoginUserInput
}>

export type LoginUserMutation = {
  __typename?: 'Mutation'
  loginUser: {
    __typename?: 'UserResult'
    error?: string | null
    data?: {
      __typename?: 'User'
      id: string
      email: string
      firstName?: string | null
      lastName?: string | null
      defaultNumber?: string | null
      phoneNumbers?: Array<{
        __typename?: 'PhoneNumber'
        number: string
      } | null> | null
    } | null
  }
}

export type UpdateUserMutationVariables = Exact<{
  input: UpdateUserInput
}>

export type UpdateUserMutation = {
  __typename?: 'Mutation'
  updateUser: {
    __typename?: 'UpdateUserResult'
    error?: string | null
    data?: {
      __typename?: 'User'
      id: string
      email: string
      firstName?: string | null
      lastName?: string | null
      defaultNumber?: string | null
      phoneNumbers?: Array<{
        __typename?: 'PhoneNumber'
        number: string
      } | null> | null
    } | null
  }
}

export type LogoutUserMutationVariables = Exact<{ [key: string]: never }>

export type LogoutUserMutation = {
  __typename?: 'Mutation'
  logoutUser: boolean
}

export type MeQueryVariables = Exact<{ [key: string]: never }>

export type MeQuery = {
  __typename?: 'Query'
  me?: {
    __typename?: 'User'
    id: string
    email: string
    firstName?: string | null
    lastName?: string | null
    defaultNumber?: string | null
    phoneNumbers?: Array<{
      __typename?: 'PhoneNumber'
      number: string
    } | null> | null
  } | null
}

export type ActivateAccountMutationVariables = Exact<{
  token: Scalars['String']
}>

export type ActivateAccountMutation = {
  __typename?: 'Mutation'
  activateAccount: {
    __typename?: 'ActivateAccountResult'
    data?: boolean | null
    error?: string | null
  }
}

export type ResetPasswordMutationVariables = Exact<{
  input: ResetPasswordInput
}>

export type ResetPasswordMutation = {
  __typename?: 'Mutation'
  resetPassword: {
    __typename?: 'ResetPasswordResult'
    data?: boolean | null
    error?: string | null
  }
}

export type ForgetPasswordMutationVariables = Exact<{
  input: ForgetPasswordInput
}>

export type ForgetPasswordMutation = {
  __typename?: 'Mutation'
  forgetPassword: {
    __typename?: 'ForgetPasswordResult'
    data?: boolean | null
    error?: string | null
  }
}

export const ReminderDetailsFragmentDoc = `
    fragment ReminderDetails on Reminder {
  id
  body
  eventTitle
  eventCelebrant
  sendAt
  sendTo
  status
  sid
  createdAt
  updatedAt
}
    `
export const PhoneNumberDetailFragmentDoc = `
    fragment PhoneNumberDetail on PhoneNumber {
  number
}
    `
export const UserDetailFragmentDoc = `
    fragment UserDetail on User {
  id
  email
  phoneNumbers {
    ...PhoneNumberDetail
  }
  firstName
  lastName
  defaultNumber
}
    ${PhoneNumberDetailFragmentDoc}`
export const RemindersDocument = `
    query reminders {
  reminders {
    data {
      ...ReminderDetails
    }
    error
  }
}
    ${ReminderDetailsFragmentDoc}`
export const useRemindersQuery = <TData = RemindersQuery, TError = unknown>(
  variables?: RemindersQueryVariables,
  options?: UseQueryOptions<RemindersQuery, TError, TData>
) =>
  useQuery<RemindersQuery, TError, TData>(
    variables === undefined ? ['reminders'] : ['reminders', variables],
    gqlClient<RemindersQuery, RemindersQueryVariables>(
      RemindersDocument,
      variables
    ),
    options
  )
export const SendVerificationCodeDocument = `
    mutation sendVerificationCode($input: SendVerificationCodeInput!) {
  sendVerificationCode(input: $input) {
    data
    error
  }
}
    `
export const useSendVerificationCodeMutation = <
  TError = unknown,
  TContext = unknown
>(
  options?: UseMutationOptions<
    SendVerificationCodeMutation,
    TError,
    SendVerificationCodeMutationVariables,
    TContext
  >
) =>
  useMutation<
    SendVerificationCodeMutation,
    TError,
    SendVerificationCodeMutationVariables,
    TContext
  >(
    ['sendVerificationCode'],
    (variables?: SendVerificationCodeMutationVariables) =>
      gqlClient<
        SendVerificationCodeMutation,
        SendVerificationCodeMutationVariables
      >(SendVerificationCodeDocument, variables)(),
    options
  )
export const VerifyCodeDocument = `
    mutation verifyCode($input: VerifyCodeInput!) {
  verifyCode(input: $input) {
    data
    error
  }
}
    `
export const useVerifyCodeMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    VerifyCodeMutation,
    TError,
    VerifyCodeMutationVariables,
    TContext
  >
) =>
  useMutation<
    VerifyCodeMutation,
    TError,
    VerifyCodeMutationVariables,
    TContext
  >(
    ['verifyCode'],
    (variables?: VerifyCodeMutationVariables) =>
      gqlClient<VerifyCodeMutation, VerifyCodeMutationVariables>(
        VerifyCodeDocument,
        variables
      )(),
    options
  )
export const CreateReminderDocument = `
    mutation createReminder($input: CreateReminderInput!) {
  createReminder(input: $input) {
    data {
      ...ReminderDetails
    }
    error
  }
}
    ${ReminderDetailsFragmentDoc}`
export const useCreateReminderMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    CreateReminderMutation,
    TError,
    CreateReminderMutationVariables,
    TContext
  >
) =>
  useMutation<
    CreateReminderMutation,
    TError,
    CreateReminderMutationVariables,
    TContext
  >(
    ['createReminder'],
    (variables?: CreateReminderMutationVariables) =>
      gqlClient<CreateReminderMutation, CreateReminderMutationVariables>(
        CreateReminderDocument,
        variables
      )(),
    options
  )
export const DeleteReminderDocument = `
    mutation deleteReminder($input: DeleteReminderInput!) {
  deleteReminder(input: $input) {
    data
    error
  }
}
    `
export const useDeleteReminderMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    DeleteReminderMutation,
    TError,
    DeleteReminderMutationVariables,
    TContext
  >
) =>
  useMutation<
    DeleteReminderMutation,
    TError,
    DeleteReminderMutationVariables,
    TContext
  >(
    ['deleteReminder'],
    (variables?: DeleteReminderMutationVariables) =>
      gqlClient<DeleteReminderMutation, DeleteReminderMutationVariables>(
        DeleteReminderDocument,
        variables
      )(),
    options
  )
export const CreateUserDocument = `
    mutation createUser($input: CreateUserInput!) {
  createUser(input: $input) {
    data
    error
  }
}
    `
export const useCreateUserMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    CreateUserMutation,
    TError,
    CreateUserMutationVariables,
    TContext
  >
) =>
  useMutation<
    CreateUserMutation,
    TError,
    CreateUserMutationVariables,
    TContext
  >(
    ['createUser'],
    (variables?: CreateUserMutationVariables) =>
      gqlClient<CreateUserMutation, CreateUserMutationVariables>(
        CreateUserDocument,
        variables
      )(),
    options
  )
export const LoginUserDocument = `
    mutation loginUser($input: LoginUserInput!) {
  loginUser(input: $input) {
    data {
      ...UserDetail
    }
    error
  }
}
    ${UserDetailFragmentDoc}`
export const useLoginUserMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    LoginUserMutation,
    TError,
    LoginUserMutationVariables,
    TContext
  >
) =>
  useMutation<LoginUserMutation, TError, LoginUserMutationVariables, TContext>(
    ['loginUser'],
    (variables?: LoginUserMutationVariables) =>
      gqlClient<LoginUserMutation, LoginUserMutationVariables>(
        LoginUserDocument,
        variables
      )(),
    options
  )
export const UpdateUserDocument = `
    mutation updateUser($input: UpdateUserInput!) {
  updateUser(input: $input) {
    data {
      ...UserDetail
    }
    error
  }
}
    ${UserDetailFragmentDoc}`
export const useUpdateUserMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    UpdateUserMutation,
    TError,
    UpdateUserMutationVariables,
    TContext
  >
) =>
  useMutation<
    UpdateUserMutation,
    TError,
    UpdateUserMutationVariables,
    TContext
  >(
    ['updateUser'],
    (variables?: UpdateUserMutationVariables) =>
      gqlClient<UpdateUserMutation, UpdateUserMutationVariables>(
        UpdateUserDocument,
        variables
      )(),
    options
  )
export const LogoutUserDocument = `
    mutation logoutUser {
  logoutUser
}
    `
export const useLogoutUserMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    LogoutUserMutation,
    TError,
    LogoutUserMutationVariables,
    TContext
  >
) =>
  useMutation<
    LogoutUserMutation,
    TError,
    LogoutUserMutationVariables,
    TContext
  >(
    ['logoutUser'],
    (variables?: LogoutUserMutationVariables) =>
      gqlClient<LogoutUserMutation, LogoutUserMutationVariables>(
        LogoutUserDocument,
        variables
      )(),
    options
  )
export const MeDocument = `
    query me {
  me {
    ...UserDetail
  }
}
    ${UserDetailFragmentDoc}`
export const useMeQuery = <TData = MeQuery, TError = unknown>(
  variables?: MeQueryVariables,
  options?: UseQueryOptions<MeQuery, TError, TData>
) =>
  useQuery<MeQuery, TError, TData>(
    variables === undefined ? ['me'] : ['me', variables],
    gqlClient<MeQuery, MeQueryVariables>(MeDocument, variables),
    options
  )
export const ActivateAccountDocument = `
    mutation activateAccount($token: String!) {
  activateAccount(token: $token) {
    data
    error
  }
}
    `
export const useActivateAccountMutation = <
  TError = unknown,
  TContext = unknown
>(
  options?: UseMutationOptions<
    ActivateAccountMutation,
    TError,
    ActivateAccountMutationVariables,
    TContext
  >
) =>
  useMutation<
    ActivateAccountMutation,
    TError,
    ActivateAccountMutationVariables,
    TContext
  >(
    ['activateAccount'],
    (variables?: ActivateAccountMutationVariables) =>
      gqlClient<ActivateAccountMutation, ActivateAccountMutationVariables>(
        ActivateAccountDocument,
        variables
      )(),
    options
  )
export const ResetPasswordDocument = `
    mutation resetPassword($input: ResetPasswordInput!) {
  resetPassword(input: $input) {
    data
    error
  }
}
    `
export const useResetPasswordMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    ResetPasswordMutation,
    TError,
    ResetPasswordMutationVariables,
    TContext
  >
) =>
  useMutation<
    ResetPasswordMutation,
    TError,
    ResetPasswordMutationVariables,
    TContext
  >(
    ['resetPassword'],
    (variables?: ResetPasswordMutationVariables) =>
      gqlClient<ResetPasswordMutation, ResetPasswordMutationVariables>(
        ResetPasswordDocument,
        variables
      )(),
    options
  )
export const ForgetPasswordDocument = `
    mutation forgetPassword($input: ForgetPasswordInput!) {
  forgetPassword(input: $input) {
    data
    error
  }
}
    `
export const useForgetPasswordMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    ForgetPasswordMutation,
    TError,
    ForgetPasswordMutationVariables,
    TContext
  >
) =>
  useMutation<
    ForgetPasswordMutation,
    TError,
    ForgetPasswordMutationVariables,
    TContext
  >(
    ['forgetPassword'],
    (variables?: ForgetPasswordMutationVariables) =>
      gqlClient<ForgetPasswordMutation, ForgetPasswordMutationVariables>(
        ForgetPasswordDocument,
        variables
      )(),
    options
  )
