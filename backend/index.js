import express from 'express'
import cors from 'cors'
import multer from 'multer'
import path from 'path'
import { ConnectDB } from './mongoClient.js'

const app = express()
app.use(cors())
app.use(express.json()) // needed to read req.body from fetch/axios
const PORT = process.env.PORT ?? 8080

const storage = multer.diskStorage({
  destination: function (req, file, cb) { // cb -> callback function
    cb(null, `uploads/${file}`); // files will be saved to uploads/<filename>
  },
  filename: function (req, file, cb) {
    // We add a timestamp to the name to avoid overwrites
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

app.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Save user to MongoDB
    const db = await ConnectDB();
    const users = db.collection('users');

    // Check if email already exists
    const existing = await users.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    await users.insertOne({ name, email, password, createdAt: new Date() });

    res.status(201).json({ message: 'Account created successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
})

const upload = multer({ storage: storage });

app.post('/api/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  // Send back metadata about the uploaded file
  res.json({
    message: 'File uploaded successfully',
    filename: req.file.filename,
    path: req.file.path
  });
});


app.get('/api/', (req, res) => {
  return res.json({ message: "Hellos from the server" })
})

// CONNECTING DATABASE

async function database() {
  const db = await ConnectDB();
  const collection = db.collection("ques_ans")

  await collection.insertOne({ name: 'Test', createdAt: new Date() });
  console.log('Document inserted');
}
database()

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`)
})
