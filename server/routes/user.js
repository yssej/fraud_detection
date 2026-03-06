const { getAllUsers, getUserById, getUserProfile, isEmailTaken, isUsernameTaken, deleteUserById} = require('../controllers/user.controller');
const {authMiddleware} = require("../middlewares/auth");

const router = require('express').Router();

router.route('/').get(authMiddleware, getAllUsers);
router.route('/profile').get(authMiddleware, getUserProfile)
router.route('/:id').get(getUserById);
router.route('/isUsernameTaken/:username').get(isUsernameTaken);
router.route('/isEmailTaken/:email').get(isEmailTaken);
router.route('/:id').delete(deleteUserById);

 module.exports = router;
