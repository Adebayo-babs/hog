	
	const express = require('express');

	const router = express.Router();

	const {indBlog, blogDetails} = require('../controllers/indexController');

	router.get('/', indBlog);
	router.get('/details/:pid', blogDetails);
	//router.post('/search/:pid', search);

	module.exports = router;