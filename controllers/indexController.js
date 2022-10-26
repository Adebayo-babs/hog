const Blog = require('../models/Blog');

const indBlog = (req, res) => {
    Blog.find((err, result) => {
        if (result) {
            res.render('index', {result});
        }
    }).sort({ dateAdded: 'desc' });
}

const blogDetails = (req, res) => {
    Blog.find({_id:req.params.pid}, (err, result) => {
        if (result) {
            res.render('details', {result});
        }
    })
}

module.exports = {
    indBlog,
    blogDetails
}


