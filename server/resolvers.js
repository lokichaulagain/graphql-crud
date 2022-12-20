import Post from "../server/models/Post.model.js";

// resolvers
export const resolvers = {
  Query: {
    hello: () => {
      return "Hello world";
    },
    getAllPost: async () => {
      const allPost = await Post.find();
      return allPost;
    },

    getSinglePost: async (parent, args, context, info) => {
      const { id } = args;
      const singlePost = await Post.findById(id);
      return singlePost;
    },
  },

  Mutation: {
    //
    createPost: async (parent, args, context, info) => {
      const { title, description } = args.post;
      const newPost = new Post({ title, description });
      await newPost.save();
      return newPost;
    },

    //
    deletePost: async (parent, args, context, info) => {
      const { id } = args;
      const deletedPost = await Post.findByIdAndDelete(id);
      return deletedPost;
    },

    //
    updatePost: async (parent, args, context, info) => {
      const { id } = args;
      const { title, description } = args.post;
      const updatedPost = await Post.findByIdAndUpdate(id, { title, description }, { new: true });
      return updatedPost;
    },
  },
};
