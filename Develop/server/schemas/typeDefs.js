const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]!
  }

  type Book {
    bookId: ID
    description: String
    authors: [String]
    image: String
    link: String
    title: String
  }

  input BookInput {
    bookId: ID
    description: String
    authors: [String]
    image: String
    link: String
    title: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    getSingleUser(username: String!): User
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    createUser(username: String, email: String, password: String): Auth
    saveBook(input: BookInput): User
    deleteBook(bookId: String): User
  }
`;

module.exports = typeDefs;
