const mongoose = require('mongoose');

const Post = new mongoose.Schema({
	title: String,
	date: { type: Date, default: Date.now },
	text: String,
	content: [String],
	comments: [
		{
			userName: String,
			text: String,
			date: { type: Date, default: Date.now }
		}
	]
});

Post.methods.getViewModel = function () {
	return {
		_id: this._id,
		title: this.title,
		date: this.date,
		text: this.text,
		content: this.content,
		comments: this.comments
	};
};

module.exports = mongoose.model('Post', Post);