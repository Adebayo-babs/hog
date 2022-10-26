	
	const bcrypt = require('bcryptjs'),
    Admin = require('../models/Admin'),
    Blog = require('../models/Blog'),
    mongoose = require('mongoose'),
    fs = require('fs'),
    multer = require('multer')
    path = require('path');


//DISPLAY SIGNUP PAGE
const mSignup = (req, res) => {
    res.render("signup");
}


//DISPLAY LOGIN PAGE
const mLogin = (req, res) => {
    res.render("login");
}


//PROCESS MERCHANT REGISTRATION
const mReg = (req, res) => {
    // console.log(req.body);
    // res.send("We are processing your information");

    const{fn, email, username, pass1, pass2} = req.body;

    let error = [];

    if (!fn || !email || !username || !pass1 || !pass2) {
        error.push({msg:"Some fields are missing. Please fill them up"});
        res.render("signup", {error, fn, email, username, pass1, pass2});
    }

    if (pass1 !== pass2) {
        error.push({msg:"Passwords do not match"});
        res.render("signup", {error, fn, email, username, pass1, pass2})
    }

    if(error.length < 1) {

        bcrypt.hash(pass2, 10, (error, hash) => {
            const admin = new Admin ({
                fn,
                email, 
                username, 
                password:hash
            });

            admin.save((err) => {
                if(err) {
                    
                    req.flash('error_msg', "There was a problem saving into the database");
                    res.redirect('/signup')
                } else {
                    req.flash('message', "Data successfully captured. Now you can login");
                    res.redirect('/login');
                }
            })
        })
    }	
    }

const mLoginPost = (req, res) => {

    const {username, password} = req.body;

    Admin.findOne({username:username}, (error, result) => {
        if (error) {
            console.log(error);
            res.send("Trying to resolve an issue");
        }

        if (!result) {
            req.flash('error_msg', "Username does not exist")
            res.redirect('/login')
        } else {
            
            bcrypt.compare(password, result.password, (err, isVerified) => {
                if (err) {
                    req.flash('error_msg', "Something uncommon has happened");
                    res.redirect('/login')
                }

                if (isVerified) {
                    req.session.admin_id = result._id;
                    req.session.username = result.username;
                    res.redirect('/dashboard');
                } else {
                    req.flash('error_msg', "Incorrect Password");
                    res.redirect('/login')
                }
            })
        }
    })


}

const home = (req, res) => {
    if (!req.session.admin_id && !req.session.username) {
        req.flash('error_msg', "Please login to access App")
        res.redirect('/login');
    } else {
        res.render('dashboard', {admin_id:req.session.admin_id, username:req.session.username})
    }
}

const addBlog = (req, res) => {
    if (!req.session.admin_id && !req.session.username) {
        req.flash('error_msg', "Please login to access App")
        res.redirect('/login');
    } else {
        res.render('addBlog', {admin_id:req.session.admin_id, username:req.session.username})
    }
}


const addBlogPost = (req, res) => {
    if (!req.session.admin_id && !req.session.username) {
        req.flash('error_msg', "Please login to access App")
        res.redirect('/login');
    } else {
        const {title, message} = req.body

        let error = [];

        if (!title || !message) {
            error.push("Vital fields are missing. Please fill them up")
            res.render("addBlog", {error, title, message})
        }

        if (error.length < 1) {
            const blog = new Blog({
                title, message, username:req.session.username
            });

            blog.save((err) => {
                if (err) {
                    req.flash('error_msg', "Could not save product into the database");
                    res.redirect('/addBlog')
                } else {
                    req.flash('message', "Blog successfully saved into the database");
                    res.redirect('/addBlog')
                }
            })
        }
    }
}

const viewBlog = (req, res) => {
    if (!req.session.merchant_id && !req.session.username) {
        req.flash('error_msg', "Please login to access App")
        res.redirect('/login');
    } else {
        Blog.find({username:req.session.username}, (error, result) => {
            if (error) {
                req.flash('error_msg', "Could not select from the database");
                res.redirect("/viewBlog");
            } else {
                res.render('viewBlog', {result, username:req.session.username});
            }
        })
    }
}

const editPage = (req, res) => {
    if (!req.session.admin_id && !req.session.username) {
        req.flash('error_msg', "Please login to access App");
        res.redirect('/login')
    } else {
        Blog.find({_id:req.params.pid}, (error, result) => {
            if (error) {
                req.flash('error_msg', "Could not query database")
                res.redirect('/edit/:pid');
            } else {
                res.render('editPage', {result, username:req.session.username});
            }
        })
    }
}

const editPagePost = (req, res) => {
    const {title, message} = req.body;

    Blog.updateOne({_id:req.params.pid}, {$set:{title, message}}, (err, result) => {
        if (err) {
            req.flash('error_msg', "Could not update Blog");
            res.redirect('/edit/:pid');
        } else {
            req.flash('message', "Blog successfully updated");
            res.redirect('/viewBlog');
        }
    })
}

const deletePage = (req, res) => {
    if (!req.session.admin_id && !req.session.username) {
        req.flash('error_msg', "Please login to access App");
        res.redirect('/login');
    } else {
        Blog.deleteOne({_id:req.params.pid}, (error, result) => {
            if (error) {
                req.flash('error_msg', "Could not query database");
                res.redirect('/viewBlog');
            } else {
                req.flash('message', "Blog successfully deleted");
                res.redirect('/viewBlog')
            }
        })
    }
}

//DISPLAY About PAGE
const aboutUs = (req, res) => {
    res.render("about");
}

//DISPLAY Announcement PAGE
const announcement = (req, res) => {
    res.render("announcement");
}

const logout = (req, res) => {
    res.redirect('/login')
}




module.exports = {
    mSignup,
    mLogin,
    mReg,
    mLoginPost, 
    home,
    addBlog,
    addBlogPost,
    viewBlog,
    editPage,
    editPagePost,
    deletePage,
    aboutUs,
    announcement,
    logout
}