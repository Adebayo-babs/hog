
	const mongoose = require('mongoose');

	const blogSchema = new mongoose.Schema({
		title:{
			type:String,
			required:true
		},
		message:{
			type:String,
			required:true
		},
		username:{
			type:String,
			required:true
		},
		dateAdded:{
			type:Date,
			default:Date.now()
		}
	});

	module.exports = new mongoose.model('Blog', blogSchema)