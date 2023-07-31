const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require('passport');

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
};
passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
        done(null, { id: jwt_payload.id, email: jwt_payload.email });
    })
);
