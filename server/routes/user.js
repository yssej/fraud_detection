const { getAllUsers, getUserById, deleteUserById} = require('../controllers/user.controller');
const authMiddleware = require("../middlewares/auth");

const router = require('express').Router();

 router.route('/').get(authMiddleware, getAllUsers);
 router.route('/:id').get(getUserById);
 router.route('/:id').delete(deleteUserById);

 module.exports = router;
