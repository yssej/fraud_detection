const authController = require("../controllers/auth.controller");
const router = require("express").Router();
const {refreshMiddleware, authMiddleware} = require("../middlewares/auth");

router.route('/refresh').post(refreshMiddleware, authController.refreshToken);
router.route('/logout').post(authMiddleware, authController.logoutUser);
router.route('/login').post(authController.loginUser);
router.route('/register').post(authController.registerUser);

module.exports = router;
