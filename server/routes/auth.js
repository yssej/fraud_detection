const authController = require("../controllers/auth.controller");
const router = require("express").Router();

router.route('/login').post(authController.loginUser);
router.route('/register').post(authController.registerUser);
router.route('/refresh').post(authController.refreshToken)

module.exports = router;
