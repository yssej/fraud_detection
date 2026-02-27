const authService = require("../services/auth.service");
const serializeUser = require("../utils/user.serializer");
const asyncHandler = require("../middlewares/asyncHandler")

const loginUser = asyncHandler(async (req, res, next) => {
    const { emailOrUsername, password } = req.body;
    const { user, token } = await authService.login(emailOrUsername, password);
    res.json({
        user: serializeUser(user),
        token: token
    })
});

const registerUser = asyncHandler(async (req, res, next) => {
    const {username, email, password} = req.body;
    const newUser = {username, email, password};
    const user = await authService.register(newUser);
    res.status(201).json({"message": "User registered successfully."});
});

module.exports = { loginUser, registerUser };
