const router = require("express").Router();
const User = require("../Models/User");
const multer = require("multer");
const service = require('../Services/render');
const controller = require('../Controllers/postsController');

const storage = multer.diskStorage({
    destination: (req, file , cb) => {
        cb(null, './public/uploads/images');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname);
    },
})

const upload = multer({
    storage:storage,
    limists:{
        fieldSize: 1024 * 1024 * 3
    },
})

router.get('/', service.homeRoutes);
router.get('/post', service.readPostRoutes);
router.get('/create', service.postRoutes);
router.get('/post/update/:id', service.updateRoutes);

router.post('/create/', upload.single('image'), controller.create);
router.get('/api/post/', controller.find);
router.post('/post/update/:id', upload.single('image'), controller.update);
router.delete('/post/:id', controller.delete);

// Get Spesific by username or category
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





module.exports = router;