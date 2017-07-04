var express = require('express');
var router = express.Router();

const postService = require('../entities/posts/postService');

/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('list', { title: 'Express' });
});


router.post('/addItem', (req, res, next) => {

	var newPost = {
		title: "some title",
		user: "some user",
		date: Date.now,
		text: "some text",
		content: ["some content"],
		comments: [
			{
				userName: "oter user",
				text: "comment text",
				date: new Date().toLocaleDateString()
			}
		]
	}

	postService.addPost(newPost).then((post) => {
		console.log(post);
		res.status(201).send(post);
	}).catch((err) => {
		res.status(403).end();
	});
});

router.get('/all', (req, res, next) => {
	postService.getAllPosts().then((posts) => {
		res.send(posts);
	}).catch((err) => {
		res.status(400).end();
	});
});

module.exports = router;
