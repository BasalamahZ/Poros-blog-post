const axios = require('axios');


exports.homeRoutes = (req,res) => {
    axios.get('http://localhost:5000/api/post')
    .then(function(response){
        res.render('home', {posts: response.data});
    })
    .catch(err => {
        res.send(err);
    })
}

exports.readPostRoutes = (req, res) => {
    axios.get('http://localhost:5000/api/post/', {params:{id:req.query.id}})
    .then(function(readPost){
        res.render('readPost', {post: readPost.data});
    })
    .catch(err => {
        res.send(err);
    })
}

exports.postRoutes = (req,res) => {
    res.render('post');
}

exports.updateRoutes = (req,res) => {
    axios.get('http://localhost:5000/api/post', {params:{id:req.params.id}})
    .then(function(update){
        res.render('update', {psot: update.data});
    })
    .catch(err => {
        res.send(err);
    })
}

exports.registerRoutes = (req, res) => {
    res.render('register')
}

exports.loginRoutes = (req, res) => {
    res.render('login')
}

exports.profileRoutes = (req, res) => {
    res.render('profil')
}