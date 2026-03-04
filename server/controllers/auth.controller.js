const authService = require("../services/auth.service");
const serializeUser = require("../utils/user.serializer");
const asyncHandler = require("../middlewares/asyncHandler");

const loginUser = asyncHandler(async (req, res, next) => {
    const { emailOrUsername, password } = req.body;
    const { user, accessToken, refreshToken } = await authService.login(emailOrUsername, password);
    // Côté Backend (Node.js/Express)
    res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: true, // Uniquement via HTTPS
        sameSite: 'Strict', // Protection contre le CSRF
        maxAge: 15 * 60 * 1000 // 15 minutes
    });

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'Strict',
        path: '/auth/refresh', // Sécurité extra : envoyé uniquement sur la route de refresh
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 jours
    });
    res.json({
        user: serializeUser(user),
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
    res.clearCookie('accessToken');
    const newAccessToken = await authService.refresh(refreshToken);
    res.cookie('accessToken', newAccessToken, {
        httpOnly: true,
        secure: true, // Uniquement via HTTPS
        sameSite: 'Strict', // Protection contre le CSRF
        maxAge: 15 * 60 * 1000 // 15 minutes
    });
    res.json({"message": "Access token refreshed successfully"});
})

module.exports = { loginUser, registerUser, refreshToken };
