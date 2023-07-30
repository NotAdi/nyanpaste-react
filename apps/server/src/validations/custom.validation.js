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

const telephone = (value, helpers) => {
    const telephoneRegex =
        /^\+((?:9[679]|8[035789]|6[789]|5[90]|42|3[578]|2[1-689])|9[0-58]|8[1246]|6[0-6]|5[1-8]|4[013-9]|3[0-469]|2[70]|7|1)(?:\W*\d){0,13}\d$/;
    if (!value.match(telephoneRegex))
        return helpers.message(
            'Telephone number must follow International format'
        );
    return value;
};

module.exports = {
    objectId,
    password,
    telephone,
};
