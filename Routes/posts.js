const router = require("express").Router();
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
router.get('/profil', service.profileRoutes);
router.get('/post', service.readPostRoutes);
router.get('/create', service.postRoutes);
router.get('/post/update/:id', service.updateRoutes);

router.post('/create/', upload.single('image'), controller.create);
router.get('/api/post/', controller.find);
router.post('/post/update/:id', upload.single('image'), controller.update);
router.delete('/post/:id', controller.delete);

module.exports = router;