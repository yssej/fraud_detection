const authController = require("../controllers/auth.controller");
const router = require("express").Router();

router.route('/login').post(authController.loginUser);
router.route('/register').post(authController.registerUser);

module.exports = router;
