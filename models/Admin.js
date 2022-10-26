
	const mongoose = require('mongoose');

	const adminSchema = new mongoose.Schema({
		fn:{
			type:String,
			required:true
		},
		email:{
			type:String,
			required:true
		},
		username: {
			type:String,
			required:true
		},
		password:{
			type:String,
			required:true
		},
		dateRegistered:{
			type:Date,
			default:Date.now()
		}
	});

	module.exports = new mongoose.model('Admin', adminSchema)