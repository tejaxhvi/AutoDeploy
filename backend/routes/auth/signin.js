import { Router } from "express";

const router = Router();

router.post('/signin', async (req, res) => {
  const { username, password } = req.body;

  const FindUser = users.find(user => user.username == username && user.password == password)

  if (FindUser) {
    const token = jwt.sign({ username }, JWT_SECRET)

    FindUser.token = token

    res.send({
      token
    })
  } else {
    res.status(403).send({
      message: "Invalid username or password"
    })
  }
});
