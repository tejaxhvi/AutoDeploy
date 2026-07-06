import { Router } from "express";

const router = Router()
  
router.post('/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    } else {

      users.push({
        username,
        password,
        email
      })

      res.status(201).json({ message: 'Account created successfully!' });
    }

    // Save user to MongoDB
    // const users = db.collection('users');

    // Check if email already exists
    // const existing = await users.findOne({ email });

    // await users.insertOne({ name, email, password, createdAt: new Date() });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
})

