const Post = require('../Models/Post');
const fs = require('fs');


exports.create = async (req, res) => {
    const post = new Post({
        title: req.body.title,
        desc: req.body.desc,
        username: req.body.username,
        category: req.body.category,
        image: req.file.filename,
    });
    try{
        await post.save()
        res.redirect('/')
    }catch(err){
        res.status(500).json(err);
    }
}

exports.find = async (req, res) => {
    if(req.query.id){
        const id = req.query.id;
        try{
            const post = await Post.findById(id);
            res.send(post);
        }catch(err){
            res.status(500).json(err);
        }
        }
    else{
        try{
            const posts = await Post.find();
            res.json(posts);
        }catch(err){
            res.json({message: err});
        }
    }
}


exports.update = async (req, res) => {
    // try{
    //     await Post.findByIdAndUpdate(
    //         req.query.id, 
    //         {$set: req.body},
    //         {new:true}
    //         )
    //         res.redirect('/')
    //     }catch(err){
    //         res.status(500).json(err);
    //     }

//     if(!req.body){
//         return res.status(400).send({message:"data is empty"})
//     }
//     const id = req.params.id;
//     Post.findByIdAndUpdate(id, req.body,{useFindAndModify: false})
//     .then(data=>{
//         if(!data){
//             res.status(404).send({message:"cannot update user"})
//         }else{
//             res.send(data)
//         }
//     })
//     .catch(err => {
//         res.status(500).json(err);
//     })
    let new_image = '';
    if(req.file){
        try{
            new_image = req.file.filename;
            fs.unlinkSync("/public/uploads/images/" + req.body.old_image)
        }catch(err){
            console.log(err);
        }
    }else{
        new_image = req.body.old_image;
    }

    try {
        let query = { _id: req.params.id }
        const update = await Post.updateMany(query, {
            title: req.body.title,
            username: req.body.username,
            desc: req.body.desc,
            category: req.body.category,  
            image : new_image
        });
        res.status(200).redirect('/')

    } catch (e) {
        res.send(e);
    }
}

exports.delete = async (req, res) => {
    try{
        await Post.findByIdAndDelete(req.params.id)
            res.redirect('/')
        }catch(err){
            res.status(500).json(err);
        }
}