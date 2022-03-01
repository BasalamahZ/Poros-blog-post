const router = require("express").Router();
const User = require("../Models/User");
const Category = require("../Models/Category");


// Create Post
router.post('/', async (req, res) => {
    const category = new Category(req.body);
    try{
        const saveCategory = await category.save()
        res.status(200).json(saveCategory);
    }catch(err){
        res.status(500).json(err);
    }
});

router.get('/', async (req, res) => {
    try{
        const categories = await Category.find();
        res.status(200).json(categories);
    }catch(err){
        res.status(500).json(err);
    }
});

// // Get All Post
// router.get('/', async (req, res) => {
//     const username = req.query.user;
//     const category = req.query.cat;
//     try{
//         let posts;
//         if(username){
//             posts = await Post.find({username})
//         }else if(category){
//             posts = await Post.find({
//                 categories:{
//                     $in:[category]
//                 }
//             })
//         }else{
//             posts = await Post.find();
//         }
//         res.status(200).json(posts);
//     }catch(err){
//         res.status(500).json(err);
//     }
// });

// // Get Sepecific Post
// router.get('/:id', async (req, res) => {
//     try{
//         const post = await Post.findById(req.params.id);
//         res.status(200).json(post);
//     }catch(err){
//         res.status(500).json(err);
//     }
// });

// // Update Post
// router.put('/:id', async (req, res) => {
//     try{
//         const post = await Post.findById(req.params.id);
//         if(post.username === req.body.username){
            
//             try{
//                 const updatePost = await Post.findByIdAndUpdate(
//                     req.params.id, 
//                     {$set: req.body},
//                     {new:true}
//                     )
                    
//                     res.status(200).json(updatePost);
//                 }catch(err){
//                     res.status(500).json(err);
//                 }
//             }else{
//                 res.status(401).json("Can Only Update Your Post!");
//             }
//     }catch(err){
//         res.status(500).json(err);
//     }
// });

// // Delete Post
// router.delete('/:id', async (req, res) => {
//     try{
//         const post = await Post.findById(req.params.id);
//         if(post.username === req.body.username){
//             try{
//                 await Post.findByIdAndDelete(req.params.id)
//                 res.status(200).json("Post Has Been Deleted!");
//             }catch(err){
//                 res.status(500).json(err);
//             }
//         }else{
//             res.status(401).json("Can Only Delete Your Post!");
//         }
//     }catch(err){
//         res.status(500).json(err);
//     }
// });


module.exports = router;