const asyncHandler = fn => (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch(next);

class ErrorResponse extends Error {
    constructor(...args) {
        super(args[0]);
        this.statusCode = args[1];
        this.errors = args[2];
        console.log(args[0]);
    }
}

const pick = (object, keys) =>
    keys.reduce((obj, key) => {
        if (object && Object.prototype.hasOwnProperty.call(object, key)) {
            // eslint-disable-next-line no-param-reassign
            obj[key] = object[key];
        }
        return obj;
    }, {});

const hasJWT = req => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        return token;
    }
};

module.exports = {
    asyncHandler,
    ErrorResponse,
    pick,
    hasJWT,
};
