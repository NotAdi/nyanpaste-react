const User = require('../model/user.model');
const { ErrorResponse } = require('../utils/utils');

const signup = async ({ email, password }) => {
    if (await User.isEmailTaken(email))
        throw new ErrorResponse('Email is already in use', 400);

    const user = await User.create({ email, password });
    const token = user.generateToken();
    return { token };
};

const login = async ({ email, password }) => {
    const user = await User.findOne({ email });
    if (!user) throw new ErrorResponse('Invalid email or password', 401);
    const isMatch = await user.isPasswordMatch(password);
    if (!isMatch) throw new ErrorResponse('Invalid email or password', 401);
    const token = user.generateToken();
    return { token };
};

module.exports = {
    signup,
    login,
};
