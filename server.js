const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;
const uri = process.env.DB_URI;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors());
app.use(express.json());

const connect = async () => {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (error) {
    console.log('Error connecting to MongoDB:', error);
  }
};

const db = client.db('nyanpaste');
const pastesCollection = db.collection('pastes');

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
    const result = await pastesCollection.insertOne({
      value,
      customNameInput,
    });
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
