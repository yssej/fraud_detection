const userService = require('../services/user.service');
const asyncHandler = require('../middlewares/asyncHandler')
const serializeUser = require('../utils/user.serializer');

const getAllUsers = asyncHandler(async (req, res, next) => {
    const users = await userService.getAll();
    res.json(users.map(serializeUser));
});

const getUserById = asyncHandler(async (req, res, next) => {
    const user = await userService.getById(req.params.id);
    res.json(serializeUser(user));
});

const deleteUserById = asyncHandler(async (req, res,next) => {
    const {id} = req.params;
    await userService.deleteById(id);
    res.json({"message": "User deleted successfully!"});
});

module.exports = {getAllUsers, getUserById, deleteUserById};
