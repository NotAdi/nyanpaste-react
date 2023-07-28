const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const { ObjectId } = require('mongodb');

// MongoDB connection 
const { client, connect } = require('./db');

const db= client.db('nyanpaste');

// Passport.js configuration
passport.use(
  new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    try {
      const usersCollection = db.collection('users');
      const user = await usersCollection.findOne({ email });

      if (!user) {
        return done(null, false, { message: 'Invalid email or password' });
      }

      const isPasswordMatch = await bcrypt.compare(password, user.password);

      if (isPasswordMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Invalid email or password' });
      }
    } catch (error) {
      return done(error);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const usersCollection = db.collection('users');
    const user = await usersCollection.findOne({ _id: new ObjectId(id) });
    done(null, user);
  } catch (error) {
    done(error);
  }
});

module.exports = passport;
