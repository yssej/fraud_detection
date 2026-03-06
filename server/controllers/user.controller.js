const userService = require('../services/user.service');
const asyncHandler = require('../middlewares/asyncHandler')
const serializeUser = require('../utils/user.serializer');

const getAllUsers = asyncHandler(async (req, res, next) => {
    console.log(req.user);
    const users = await userService.getAll();
    res.json(users.map(serializeUser));
});

const getUserById = asyncHandler(async (req, res, next) => {
    const {id} = req.params.id;
    const user = await userService.getById(id);
    res.json(serializeUser(user));
});

const getUserProfile = asyncHandler(async (req, res, next) => {
    const {id} = req.user;
    const user = await userService.getById(id);
    res.json(serializeUser(user));
});

const isEmailTaken = asyncHandler(async (req, res, next) => {
    const {email} = req.params;
    const isTaken = await userService.isEmailTaken(email);
    res.json({isTaken});
});

const isUsernameTaken = asyncHandler(async (req, res, next) => {
    const {username} = req.params;
    const isTaken = await userService.isUsernameTaken(username);
    res.json({isTaken});
})

const deleteUserById = asyncHandler(async (req, res,next) => {
    const {id} = req.params;
    await userService.deleteById(id);
    res.json({"message": "User deleted successfully!"});
});

module.exports = {getAllUsers, getUserById, getUserProfile, deleteUserById, isEmailTaken, isUsernameTaken};
