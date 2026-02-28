const authService = require("../services/auth.service");
const serializeUser = require("../utils/user.serializer");
const asyncHandler = require("../middlewares/asyncHandler");

const loginUser = asyncHandler(async (req, res, next) => {
    const { emailOrUsername, password } = req.body;
    const { user, accessToken, refreshToken } = await authService.login(emailOrUsername, password);
    res.json({
        user: serializeUser(user),
        accessToken: accessToken,
        refreshToken: refreshToken
    })
});

const registerUser = asyncHandler(async (req, res, next) => {
    const {username, email, password} = req.body;
    const newUser = {username, email, password};
    await authService.register(newUser);
    res.status(201).json({"message": "User registered successfully."});
});

const refreshToken = asyncHandler(async (req, res, next) => {
    const { refreshToken } = req.body;
    const newAccessToken = await authService.refresh(refreshToken);
    res.json({"accessToken": newAccessToken});
})

module.exports = { loginUser, registerUser, refreshToken };
