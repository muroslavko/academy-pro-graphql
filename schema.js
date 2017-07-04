var graphql = require('graphql')
var GraphQLObjectType = graphql.GraphQLObjectType
var GraphQLInt = graphql.GraphQLInt
var GraphQLBoolean = graphql.GraphQLBoolean
var GraphQLString = graphql.GraphQLString
var GraphQLList = graphql.GraphQLList
var GraphQLNonNull = graphql.GraphQLNonNull
var GraphQLSchema = graphql.GraphQLSchema

const postService = require('./app/entities/posts/postService');


var idCounter = 1;

var CommentType = new GraphQLObjectType({
  name: 'comment',
  fields: () => ({
    userName: {
      type: GraphQLInt,
      description: 'comment userName'
    },
    text: {
      type: GraphQLString,
      description: 'comment text'
    },
    date: {
      type: GraphQLString,
      description: 'comment date'
    }
  })
});

var PostType = new GraphQLObjectType({
  name: 'post',
  fields: () => ({
    id: {
      type: GraphQLString,
      description: 'post id'
    },
    title: {
      type: GraphQLString,
      description: 'post title'
    },
    user: {
      type: GraphQLString,
      description: 'post user'
    },
    date: {
      type: GraphQLString,
      description: 'post date'
    },
    text: {
      type: GraphQLString,
      description: 'post text'
    },
    content: {
      type: new GraphQLList(GraphQLString),
      description: 'post content'
    },
    comments: {
      type: new GraphQLList(CommentType),
      description: 'post comments'
    },
  })
});

var QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    posts: {
      type: new GraphQLList(PostType),
      resolve: () => postService.getAllPosts()
    },
    post: {
      type: PostType,
      description: 'Get one Post by id',
      args: {
        id: {
          name: 'Post id',
          type: new GraphQLNonNull(GraphQLString)
        }
      },
      resolve: (root, args) => {
        var items = postService.getPostById(args.id)
        return items;
      }
    }
  })
});


var MutationAdd = {
  type: PostType,
  description: 'Add a Post',
  args: {
    title: {
      name: 'Post title',
      type: new GraphQLNonNull(GraphQLString)
    },
    text: {
      name: 'Post text',
      type: GraphQLString
    }
  },
  resolve: (root, args) => {

    var item = {
      title: args.title,
      user: "some user",
      text: args.text,
      content: [],
      comments: []
    };

    return postService.addPost(item).then((post)=>{
      return post;
    });
    //return TODOs;
  }
};

// var MutationToggle = {
//   type: new GraphQLList(PostType),
//   description: 'Toggle the todo',
//   args: {
//     id: {
//       name: 'Post Id',
//       type: new GraphQLNonNull(GraphQLInt)
//     }
//   },
//   resolve: (root, args) => {
//     TODOs
//       .filter((todo) => todo.id === args.id)
//       .forEach((todo) => todo.completed = !todo.completed)
//     return TODOs;
//   }
// };

// var MutationDestroy = {
//   type: new GraphQLList(PostType),
//   description: 'Destroy the todo',
//   args: {
//     id: {
//       name: 'Post Id',
//       type: new GraphQLNonNull(GraphQLInt)
//     }
//   },
//   resolve: (root, args) => {
//     return TODOs = TODOs.filter((todo) => todo.id !== args.id);
//   }
// };

// var MutationToggleAll = {
//   type: new GraphQLList(PostType),
//   description: 'Toggle all todos',
//   args: {
//     checked: {
//       name: 'Post Id',
//       type: new GraphQLNonNull(GraphQLBoolean)
//     }
//   },
//   resolve: (root, args) => {
//     TODOs.forEach((todo) => todo.completed = args.checked)
//     return TODOs;
//   }
// };

// var MutationClearCompleted = {
//   type: new GraphQLList(PostType),
//   description: 'Clear completed',
//   resolve: () => {
//     return TODOs = TODOs.filter((todo) => !todo.completed)
//   }
// };

// var MutationSave = {
//   type: new GraphQLList(PostType),
//   description: 'Edit a todo',
//   args: {
//     id: {
//       name: 'Post Id',
//       type: new GraphQLNonNull(GraphQLInt)
//     },
//     title: {
//       name: 'Post title',
//       type: new GraphQLNonNull(GraphQLString)
//     }
//   },
//   resolve: (root, args) => {
//     TODOs
//       .filter((todo) => todo.id === args.id)
//       .forEach((todo) => todo.title = args.title)
//     return TODOs
//   }
// }

var MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    add: MutationAdd,
    // toggle: MutationToggle,
    // toggleAll: MutationToggleAll,
    // destroy: MutationDestroy,
    // clearCompleted: MutationClearCompleted,
    // save: MutationSave
  }
});

module.exports = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType
});
