const mongoose = require('mongoose');

const objectId = (value, helpers) => {
    if (mongoose.Types.ObjectId.isValid(value)) return value;
    return helpers.message('Invalid mongoDb Object Id');
};

const password = (value, helpers) => {
    const specialCharacterFormat = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

    if (value.length < 8)
        return helpers.message('password must be at least 8 characters');

    if (value.search(/[0-9]/) === -1)
        return helpers.message('Password must contain at least one number');

    if (value.search(/[a-z]/) === -1)
        return helpers.message(
            'Password must contain one lower case character'
        );

    if (value.search(/[A-Z]/) === -1)
        return helpers.message(
            'Password must contain one upper case character'
        );

    if (!specialCharacterFormat.test(value))
        return helpers.message('Password must contain special character');
    return value;
};


module.exports = {
    objectId,
    password,
};
