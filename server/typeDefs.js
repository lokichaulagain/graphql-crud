import { gql } from "apollo-server-express";

// typeDefinition
export const typeDefs = gql`
  # graphql Post object type
  type Post {
    id: ID
    title: String
    description: String
  }

  type Query {
    hello: String
    # get all posts
    getAllPost: [Post]

    # get single post
    getSinglePost(id: ID): Post
  }

  #  mutation
  input PostInput {
    title: String
    description: String
  }
  type Mutation {
    # create post mutation--------->
    # createPost(title: String, description: String): Post
    createPost(post: PostInput): Post

    # delete post mutation--------->
    deletePost(id: ID): Post

    # update post mutation--------->
    updatePost(id: ID, post: PostInput): Post
  }
`;
