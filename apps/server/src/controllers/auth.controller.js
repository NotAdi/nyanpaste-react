const passport = require('passport');
const { authService } = require('../services');
const { asyncHandler } = require('../utils/utils');

const signup = asyncHandler(async (req, res) => {
    return res.status(201).json(await authService.signup(req.body));
});

const login = asyncHandler(async (req, res) => {
    return res.status(200).json(await authService.login(req.body));
});

module.exports = {
    signup,
    login,
};
