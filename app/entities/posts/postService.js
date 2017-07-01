const postRepository = require('./postRepository');

class PostService {

	getAllPosts(){
		return postRepository.findAll();
	}

	getPostById(id){
		return postRepository.findById(id);
	}

	editPost(id, post){
		return postRepository.update({_id: id}, post);
	}

	deletePost(id){
		return postRepository.delete({_id: id});
	}

	addPost(post){
		var d = new Date();
		post.date = d.toLocaleDateString();
		return postRepository.add(post);
	}
}

module.exports = new PostService();