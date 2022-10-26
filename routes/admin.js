	
	const express = require('express');
	const router = express.Router();

	const {mSignup, mLogin, mReg, mLoginPost, home, addBlog, addBlogPost, viewBlog, editPage, editPagePost, deletePage, aboutUs, announcement, logout} = require('../controllers/admin');

	router.get('/signup', mSignup);
	router.get('/login', mLogin);
	router.post('/signup', mReg);
	router.post('/login', mLoginPost);
	router.get('/dashboard', home);
	router.get('/addBlog', addBlog);
	router.post('/addBlog', addBlogPost)
	router.get('/viewBlog', viewBlog)
	router.get('/edit/:pid', editPage);
	router.post('/edit/:pid', editPagePost);
	router.get('/delete/:pid', deletePage);
	router.get('/about', aboutUs)
	router.get('/announcement', announcement)
	router.get('/logout', logout)

	module.exports = router;