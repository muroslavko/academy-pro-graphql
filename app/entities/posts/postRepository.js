const Repository = require('../../common/Repository');
const PostModel = require('./postSchema');

class TaskRepository extends Repository{

	constructor(){
		super();
		this.model = PostModel;
	}

}

module.exports = new TaskRepository();