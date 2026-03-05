const bcrypt = require("bcrypt");
const { generateAccessToken, generateRefreshToken, verifyRefreshToken } = require("../utils/jwt");
const BadRequestError = require("../middlewares/errors/BadRequestError");
const UnauthorizedError = require('../middlewares/errors/UnauthorizedError');
const { User} = require("../models/Membership");
const { RefreshToken } = require("../models/index");
const { Op } = require('sequelize');

const login = async (emailOrUsername, password) => {
    if(!emailOrUsername || !password) throw new BadRequestError("Email/Username and Password are required");
    const user = await User.findOne({
        where: {
            [Op.or]: [
                { email: emailOrUsername },
                { username: emailOrUsername }
            ]
        }
    });
    if(!user) throw new BadRequestError("Invalid credentials");
    const isMatch = bcrypt.compare(user.password, password);
    if(!isMatch) throw new BadRequestError("Invalid credentials");

    const accessToken = generateAccessToken({
        id: user.id,
    });
    const refreshToken = generateRefreshToken({
        id: user.id
    });
    await RefreshToken.create({
        token: refreshToken,
        userId: user.id,
        expiredAt: new Date(Date.now() + 5*24*60*60*1000)
    })
    return { user, accessToken, refreshToken };
}

const isEmailTaken = async (email) => {
    const user = await User.findOne({where: {email}});
    return !!user;
}

const isUsernameTaken = async (username) => {
    const user = await User.findOne({where: {username}});
    return !!user;
}

const register = async (user) => {
    if(!user.username || !user.email || !user.password) throw new BadRequestError("Missing required fields");
    if(user.username.length < 3) throw new BadRequestError("Username must be at least 3 characters long");
    if(user.password.length < 6) throw new BadRequestError("Password must be at least 6 characters long");
    if(!user.email.includes("@") && !user.email.includes(".")) throw new BadRequestError("Invalid email");
    if(await isEmailTaken(user.email)) throw new BadRequestError("Email already taken");
    if(await isUsernameTaken(user.username)) throw new BadRequestError("Username already taken");
    user.password = await bcrypt.hash(user.password, 10);
    User.create(user);
}

const refresh = async (token) => {
    if(!token) throw new UnauthorizedError('RefreshToken is required.');
    const storedToken = await RefreshToken.findOne({where: {token}});
    if(!storedToken) throw new UnauthorizedError("Invalid refresh token.");
    if(storedToken.expiredAt < new Date()) {
        await RefreshToken.destroy({where: {token}});
        throw new UnauthorizedError("Refresh token expired.");
    }
    const refresh = storedToken.token;
    const decoded = verifyRefreshToken(refresh);
    const user = await User.findByPk(decoded.id);
    const newAccessToken = generateAccessToken({
        id: user.id
    });
    return { accessToken: newAccessToken }
}

const logout = async (id) => {
    await RefreshToken.destroy({where: {id}});
}

module.exports = { login, register, refresh, logout };
