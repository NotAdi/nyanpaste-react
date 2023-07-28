const express = require('express');
const session = require('express-session');
const passport = require('./passportConfig');
const cors = require('cors');
const bcrypt = require('bcrypt');
const MongoStore = require('connect-mongo');


const app = express();
const port = process.env.PORT || 5000;
const { client, connect } = require('./db');

require('dotenv').config();



app.use(cors());
app.use(express.json());
app.use(
  session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.DB_URI,
      ttl: 24 * 60 * 60, // Session TTL in seconds (optional)
    }),
  })
  );
  
  app.use(express.urlencoded({ extended: true }));
  app.use(passport.initialize());
  app.use(passport.session());
  
  app.use(passport.authenticate('session'));
  
  const db = client.db('nyanpaste');
const pastesCollection = db.collection('pastes');


app.post('/register', async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  const hashedPassword = await bcrypt.hash(password, 10);
  
  try {
    // const db = client.db('nyanpaste'); 
    const usersCollection = db.collection('users');
    const user = await usersCollection.findOne({ email });
    console.log(user);
    
    if (user) {
      return res.status(400).json({ message: 'Username already exists' });
    }
    
    const result = await usersCollection.insertOne({ email, password: hashedPassword });
    res.status(201).json({ message: 'User registered successfully' });
    res.redirect("/");
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'An error occurred' });
  }
});

// Login user
app.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    console.log(user);
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ message: info.message });
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      req.session.user= user;
      //   req.session.save(() => {
        //     // successRedirectin the callback here
        //     next('/');
        // });
        res.redirect("/");
        // console.log(req.isAuthenticated());
        // res.redirect("/");
        // return res.status(200).json({ message: 'Login successful' });
      });
    })(req, res, next);
  });
  
// Logout user
app.post('/logout', (req, res) => {
  console.log("Reached logout");
  req.logout(() => {
    console.log("Logged Out");
  });

  res.json({ message: 'Logout successful' });
});

// Protected route example (only accessible to authenticated users)
app.get(' /protected', (req, res) => {
  if (req.isAuthenticated()) {
    console.log(req);
    res.json({ message: 'This is a protected route', user: req.user });
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
});






// Health Check
app.get('/health', (req, res) => {
  res.sendStatus(200);
});

app.get('/', (req, res) => {
  const code = `Welcome to nyanpaste!

Use the toolbox at the top to create a new file and share your code`;
  res.status(200).json({ code, language: "plaintext" });
});


// Save paste
app.post('/save', async (req, res) => {
  const { value, customNameInput } = req.body;
  try {
    console.log(req.isAuthenticated());
    var result;
    if(req.isAuthenticated()){
      console.log("Reached the auth part");
      console.log(req);
      const { username } = req.session.user;
      // var result;
        result = await pastesCollection.insertOne({
        value,
        customNameInput,
        username
      });
      res.json({ insertedId: result.insertedId });
    }
    else{
      result = await pastesCollection.insertOne({
      value,
      customNameInput,
    });
  }
    res.json({ insertedId: result.insertedId });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error saving paste' });
  }
});

// Get paste by ID or customName
app.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    let paste;
    if (id.length === 24) {
      paste = await pastesCollection.findOne({ _id: new ObjectId(id) });
    } else {
      paste = await pastesCollection.findOne({ customNameInput: id });
    }

    if (!paste) {
      res.status(404).json({ message: 'Paste not found' });
    } else {
      res.json({ code: paste.value });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error fetching paste' });
  }
});

// Root route

// New page route
app.get('/new', (req, res) => {
  const value = '';
  res.json({ value });
});

// Start the server
connect().then(() => {
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
});
