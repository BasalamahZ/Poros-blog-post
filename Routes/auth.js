const router = require("express").Router();
const service = require('../Services/render');
const controller = require('../Controllers/authController');

router.get('/login', service.loginRoutes);
router.get('/register', service.registerRoutes);

router.post('/login', controller.login);
router.post('/register', controller.register);

module.exports = router;