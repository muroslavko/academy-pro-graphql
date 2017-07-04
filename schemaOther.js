var { buildSchema } = require('graphql');
const postService = require('./app/entities/posts/postService');

console.log(typeof buildSchema);

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
interface Base {
	user:String
    date:String
    text:String
}

type Comment implements Base {
    user:String
    date:String
    text:String
}

type Post implements Base {
	id:String
    title:String
	user:String
    date:String
    text:String
	content: [String]
	comments: [Comment]
}
  type Query {
    posts: [Post]
	post(id: String!): Post
  }

type Mutation {
	add(title: String!, text: String): Post
}

`);

// The root provides a resolver function for each API endpoint
var root = {
	posts: () => postService.getAllPosts(),
	post: ({id}) => postService.getPostById(id),
	add: ({ title, text }) => {
		var item = {
			title: title,
			user: "some user",
			text: text,
			content: [],
			comments: []
		};

		return postService.addPost(item).then((post) => {
			return post;
		});
	}

};


module.exports = {
	schema: schema,
	root: root
};