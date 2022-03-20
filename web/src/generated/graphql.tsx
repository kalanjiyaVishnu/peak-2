import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type FieldError = {
  __typename?: 'FieldError';
  field?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addPost: Post;
  login: UserResponse;
  register: UserResponse;
  updatePost: Post;
};


export type MutationAddPostArgs = {
  input: PostInputs;
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationRegisterArgs = {
  data: UserInput;
};


export type MutationUpdatePostArgs = {
  input: PostInputs;
};

export type Post = {
  __typename?: 'Post';
  body: Scalars['String'];
  createdDate: Scalars['DateTime'];
  id: Scalars['String'];
  title: Scalars['String'];
  updatedDate: Scalars['DateTime'];
  userID: Scalars['String'];
};

export type PostInputs = {
  body: Scalars['String'];
  postId?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  Me: UserResponse;
  deletePost: Scalars['Boolean'];
  getAllPosts: Array<Post>;
  hello: Scalars['String'];
};


export type QueryDeletePostArgs = {
  postId: Scalars['String'];
};


export type QueryHelloArgs = {
  name: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
  posts?: Maybe<Array<Post>>;
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type UserInput = {
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
};

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', Me: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field?: string | null, message?: string | null }> | null, user?: { __typename?: 'User', email: string, id: string, name: string, posts?: Array<{ __typename?: 'Post', body: string, createdDate: any, id: string, title: string, updatedDate: any, userID: string }> | null } | null } };

export type LoginMutationVariables = Exact<{
  password: Scalars['String'];
  email: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field?: string | null, message?: string | null }> | null, user?: { __typename?: 'User', email: string, id: string, name: string, posts?: Array<{ __typename?: 'Post', title: string }> | null } | null } };

export type CreatePostMutationVariables = Exact<{
  input: PostInputs;
}>;


export type CreatePostMutation = { __typename?: 'Mutation', addPost: { __typename?: 'Post', title: string, userID: string, id: string, body: string } };

export type RegisterMutationVariables = Exact<{
  data: UserInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserResponse', user?: { __typename?: 'User', email: string, id: string, name: string } | null, errors?: Array<{ __typename?: 'FieldError', field?: string | null, message?: string | null }> | null } };


export const MeDocument = gql`
    query Me {
  Me {
    errors {
      field
      message
    }
    user {
      email
      id
      name
      posts {
        body
        createdDate
        id
        title
        updatedDate
        userID
      }
    }
  }
}
    `;

export function useMeQuery(options?: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'>) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};
export const LoginDocument = gql`
    mutation login($password: String!, $email: String!) {
  login(password: $password, email: $email) {
    errors {
      field
      message
    }
    user {
      email
      id
      name
      posts {
        title
      }
    }
  }
}
    `;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const CreatePostDocument = gql`
    mutation createPost($input: PostInputs!) {
  addPost(input: $input) {
    title
    userID
    id
    body
  }
}
    `;

export function useCreatePostMutation() {
  return Urql.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument);
};
export const RegisterDocument = gql`
    mutation register($data: userInput!) {
  register(data: $data) {
    user {
      email
      id
      name
    }
    errors {
      field
      message
    }
  }
}
    `;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};