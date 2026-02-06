import express from 'express'
import cors from 'cors'
import multer from 'multer'
import fs from 'fs'
import path from 'path'

const app = express()
app.use(cors())
const PORT = process.env.PORT ?? 8080

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Save files to 'uploads' folder
  },
  filename: function (req, file, cb) {
    // We add a timestamp to the name to avoid overwrites
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage : storage });

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


app.get('/api/',(req,res) => {
	return res.json({message : "Hellos from the server"})
})


app.listen(PORT, () => {
	console.log(`Server is running on PORT ${PORT}`)
})
