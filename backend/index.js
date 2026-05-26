import express from 'express'
import cors from 'cors'
import multer from 'multer'
import fs from 'fs'
import path from 'path'
import { ConnectDB } from './mongoClient.js'

const app = express()
app.use(cors())
const PORT = process.env.PORT ?? 8080

// Defining Storage for the Multer.
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

app.post('/signup', (req, res) => {
  res.status(501).json({ message: 'Signup not implemented yet' })
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
