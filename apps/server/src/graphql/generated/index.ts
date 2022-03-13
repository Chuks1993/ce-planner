/* eslint-disable */
import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { MyContext } from 'src/types';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type ActivateAccountResult = {
  __typename?: 'ActivateAccountResult';
  data?: Maybe<Scalars['Boolean']>;
  error?: Maybe<Scalars['String']>;
};

export type CreateReminderInput = {
  eventCelebrant: Scalars['String'];
  eventTitle: Scalars['String'];
  phoneNumber: Scalars['String'];
  sendAt: Scalars['DateTime'];
};

export type CreateReminderResult = {
  __typename?: 'CreateReminderResult';
  data?: Maybe<Reminder>;
  error?: Maybe<Scalars['String']>;
};

export type CreateUserInput = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
  phoneNumber: Scalars['String'];
};

export type CreateUserResult = {
  __typename?: 'CreateUserResult';
  data?: Maybe<Scalars['Boolean']>;
  error?: Maybe<Scalars['String']>;
};

export type DeleteReminderInput = {
  reminderId: Scalars['String'];
};

export type DeleteReminderResult = {
  __typename?: 'DeleteReminderResult';
  data?: Maybe<Scalars['Boolean']>;
  error?: Maybe<Scalars['String']>;
};

export type ForgetPasswordInput = {
  email: Scalars['String'];
};

export type ForgetPasswordResult = {
  __typename?: 'ForgetPasswordResult';
  data?: Maybe<Scalars['Boolean']>;
  error?: Maybe<Scalars['String']>;
};

export type LoginUserInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  rememberMe?: InputMaybe<Scalars['Boolean']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  activateAccount: ActivateAccountResult;
  createReminder: CreateReminderResult;
  createUser: CreateUserResult;
  deleteReminder: DeleteReminderResult;
  forgetPassword: ForgetPasswordResult;
  loginUser: UserResult;
  logoutUser: Scalars['Boolean'];
  resetPassword: ResetPasswordResult;
  sendVerificationCode: SendVerificationCodeResult;
  updateUser: UpdateUserResult;
  verifyCode: VerifyCodeResult;
};


export type MutationActivateAccountArgs = {
  token: Scalars['String'];
};


export type MutationCreateReminderArgs = {
  input: CreateReminderInput;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationDeleteReminderArgs = {
  input: DeleteReminderInput;
};


export type MutationForgetPasswordArgs = {
  input: ForgetPasswordInput;
};


export type MutationLoginUserArgs = {
  input: LoginUserInput;
};


export type MutationResetPasswordArgs = {
  input: ResetPasswordInput;
};


export type MutationSendVerificationCodeArgs = {
  input: SendVerificationCodeInput;
};


export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};


export type MutationVerifyCodeArgs = {
  input: VerifyCodeInput;
};

export type PhoneNumber = {
  __typename?: 'PhoneNumber';
  number: Scalars['ID'];
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<User>;
  reminders: RemindersResult;
};

export type Reminder = {
  __typename?: 'Reminder';
  body: Scalars['String'];
  createdAt: Scalars['DateTime'];
  eventCelebrant: Scalars['String'];
  eventTitle: Scalars['String'];
  id: Scalars['ID'];
  sendAt: Scalars['DateTime'];
  sendTo: Scalars['String'];
  sid: Scalars['String'];
  status: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  user: User;
};

export type RemindersResult = {
  __typename?: 'RemindersResult';
  data?: Maybe<Array<Maybe<Reminder>>>;
  error?: Maybe<Scalars['String']>;
};

export type ResetPasswordInput = {
  password: Scalars['String'];
  token: Scalars['String'];
};

export type ResetPasswordResult = {
  __typename?: 'ResetPasswordResult';
  data?: Maybe<Scalars['Boolean']>;
  error?: Maybe<Scalars['String']>;
};

export type SendVerificationCodeInput = {
  phoneNumber: Scalars['String'];
};

export type SendVerificationCodeResult = {
  __typename?: 'SendVerificationCodeResult';
  data?: Maybe<Scalars['String']>;
  error?: Maybe<Scalars['String']>;
};

export type UpdateUserInput = {
  defaultNumber: Scalars['String'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
};

export type UpdateUserResult = {
  __typename?: 'UpdateUserResult';
  data?: Maybe<User>;
  error?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  defaultNumber?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  firstName?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  lastName?: Maybe<Scalars['String']>;
  phoneNumbers?: Maybe<Array<Maybe<PhoneNumber>>>;
  reminders?: Maybe<Array<Maybe<Reminder>>>;
};

export type UserResult = {
  __typename?: 'UserResult';
  data?: Maybe<User>;
  error?: Maybe<Scalars['String']>;
};

export type VerifyCodeInput = {
  code: Scalars['String'];
  sendTo: Scalars['String'];
  sid: Scalars['String'];
  verifyAndAdd?: InputMaybe<Scalars['Boolean']>;
};

export type VerifyCodeResult = {
  __typename?: 'VerifyCodeResult';
  data?: Maybe<Scalars['Boolean']>;
  error?: Maybe<Scalars['String']>;
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  ActivateAccountResult: ResolverTypeWrapper<ActivateAccountResult>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  CreateReminderInput: CreateReminderInput;
  CreateReminderResult: ResolverTypeWrapper<CreateReminderResult>;
  CreateUserInput: CreateUserInput;
  CreateUserResult: ResolverTypeWrapper<CreateUserResult>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  DeleteReminderInput: DeleteReminderInput;
  DeleteReminderResult: ResolverTypeWrapper<DeleteReminderResult>;
  ForgetPasswordInput: ForgetPasswordInput;
  ForgetPasswordResult: ResolverTypeWrapper<ForgetPasswordResult>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  LoginUserInput: LoginUserInput;
  Mutation: ResolverTypeWrapper<{}>;
  PhoneNumber: ResolverTypeWrapper<PhoneNumber>;
  Query: ResolverTypeWrapper<{}>;
  Reminder: ResolverTypeWrapper<Reminder>;
  RemindersResult: ResolverTypeWrapper<RemindersResult>;
  ResetPasswordInput: ResetPasswordInput;
  ResetPasswordResult: ResolverTypeWrapper<ResetPasswordResult>;
  SendVerificationCodeInput: SendVerificationCodeInput;
  SendVerificationCodeResult: ResolverTypeWrapper<SendVerificationCodeResult>;
  String: ResolverTypeWrapper<Scalars['String']>;
  UpdateUserInput: UpdateUserInput;
  UpdateUserResult: ResolverTypeWrapper<UpdateUserResult>;
  User: ResolverTypeWrapper<User>;
  UserResult: ResolverTypeWrapper<UserResult>;
  VerifyCodeInput: VerifyCodeInput;
  VerifyCodeResult: ResolverTypeWrapper<VerifyCodeResult>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  ActivateAccountResult: ActivateAccountResult;
  Boolean: Scalars['Boolean'];
  CreateReminderInput: CreateReminderInput;
  CreateReminderResult: CreateReminderResult;
  CreateUserInput: CreateUserInput;
  CreateUserResult: CreateUserResult;
  DateTime: Scalars['DateTime'];
  DeleteReminderInput: DeleteReminderInput;
  DeleteReminderResult: DeleteReminderResult;
  ForgetPasswordInput: ForgetPasswordInput;
  ForgetPasswordResult: ForgetPasswordResult;
  ID: Scalars['ID'];
  LoginUserInput: LoginUserInput;
  Mutation: {};
  PhoneNumber: PhoneNumber;
  Query: {};
  Reminder: Reminder;
  RemindersResult: RemindersResult;
  ResetPasswordInput: ResetPasswordInput;
  ResetPasswordResult: ResetPasswordResult;
  SendVerificationCodeInput: SendVerificationCodeInput;
  SendVerificationCodeResult: SendVerificationCodeResult;
  String: Scalars['String'];
  UpdateUserInput: UpdateUserInput;
  UpdateUserResult: UpdateUserResult;
  User: User;
  UserResult: UserResult;
  VerifyCodeInput: VerifyCodeInput;
  VerifyCodeResult: VerifyCodeResult;
}>;

export type ActivateAccountResultResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['ActivateAccountResult'] = ResolversParentTypes['ActivateAccountResult']> = ResolversObject<{
  data?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CreateReminderResultResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['CreateReminderResult'] = ResolversParentTypes['CreateReminderResult']> = ResolversObject<{
  data?: Resolver<Maybe<ResolversTypes['Reminder']>, ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CreateUserResultResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['CreateUserResult'] = ResolversParentTypes['CreateUserResult']> = ResolversObject<{
  data?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type DeleteReminderResultResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['DeleteReminderResult'] = ResolversParentTypes['DeleteReminderResult']> = ResolversObject<{
  data?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ForgetPasswordResultResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['ForgetPasswordResult'] = ResolversParentTypes['ForgetPasswordResult']> = ResolversObject<{
  data?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  activateAccount?: Resolver<ResolversTypes['ActivateAccountResult'], ParentType, ContextType, RequireFields<MutationActivateAccountArgs, 'token'>>;
  createReminder?: Resolver<ResolversTypes['CreateReminderResult'], ParentType, ContextType, RequireFields<MutationCreateReminderArgs, 'input'>>;
  createUser?: Resolver<ResolversTypes['CreateUserResult'], ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'input'>>;
  deleteReminder?: Resolver<ResolversTypes['DeleteReminderResult'], ParentType, ContextType, RequireFields<MutationDeleteReminderArgs, 'input'>>;
  forgetPassword?: Resolver<ResolversTypes['ForgetPasswordResult'], ParentType, ContextType, RequireFields<MutationForgetPasswordArgs, 'input'>>;
  loginUser?: Resolver<ResolversTypes['UserResult'], ParentType, ContextType, RequireFields<MutationLoginUserArgs, 'input'>>;
  logoutUser?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  resetPassword?: Resolver<ResolversTypes['ResetPasswordResult'], ParentType, ContextType, RequireFields<MutationResetPasswordArgs, 'input'>>;
  sendVerificationCode?: Resolver<ResolversTypes['SendVerificationCodeResult'], ParentType, ContextType, RequireFields<MutationSendVerificationCodeArgs, 'input'>>;
  updateUser?: Resolver<ResolversTypes['UpdateUserResult'], ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'input'>>;
  verifyCode?: Resolver<ResolversTypes['VerifyCodeResult'], ParentType, ContextType, RequireFields<MutationVerifyCodeArgs, 'input'>>;
}>;

export type PhoneNumberResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['PhoneNumber'] = ResolversParentTypes['PhoneNumber']> = ResolversObject<{
  number?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  me?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  reminders?: Resolver<ResolversTypes['RemindersResult'], ParentType, ContextType>;
}>;

export type ReminderResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Reminder'] = ResolversParentTypes['Reminder']> = ResolversObject<{
  body?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  eventCelebrant?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  eventTitle?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  sendAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  sendTo?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  sid?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type RemindersResultResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['RemindersResult'] = ResolversParentTypes['RemindersResult']> = ResolversObject<{
  data?: Resolver<Maybe<Array<Maybe<ResolversTypes['Reminder']>>>, ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ResetPasswordResultResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['ResetPasswordResult'] = ResolversParentTypes['ResetPasswordResult']> = ResolversObject<{
  data?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SendVerificationCodeResultResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['SendVerificationCodeResult'] = ResolversParentTypes['SendVerificationCodeResult']> = ResolversObject<{
  data?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UpdateUserResultResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['UpdateUserResult'] = ResolversParentTypes['UpdateUserResult']> = ResolversObject<{
  data?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  defaultNumber?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  firstName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  phoneNumbers?: Resolver<Maybe<Array<Maybe<ResolversTypes['PhoneNumber']>>>, ParentType, ContextType>;
  reminders?: Resolver<Maybe<Array<Maybe<ResolversTypes['Reminder']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserResultResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['UserResult'] = ResolversParentTypes['UserResult']> = ResolversObject<{
  data?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type VerifyCodeResultResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['VerifyCodeResult'] = ResolversParentTypes['VerifyCodeResult']> = ResolversObject<{
  data?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = MyContext> = ResolversObject<{
  ActivateAccountResult?: ActivateAccountResultResolvers<ContextType>;
  CreateReminderResult?: CreateReminderResultResolvers<ContextType>;
  CreateUserResult?: CreateUserResultResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  DeleteReminderResult?: DeleteReminderResultResolvers<ContextType>;
  ForgetPasswordResult?: ForgetPasswordResultResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  PhoneNumber?: PhoneNumberResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Reminder?: ReminderResolvers<ContextType>;
  RemindersResult?: RemindersResultResolvers<ContextType>;
  ResetPasswordResult?: ResetPasswordResultResolvers<ContextType>;
  SendVerificationCodeResult?: SendVerificationCodeResultResolvers<ContextType>;
  UpdateUserResult?: UpdateUserResultResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserResult?: UserResultResolvers<ContextType>;
  VerifyCodeResult?: VerifyCodeResultResolvers<ContextType>;
}>;

