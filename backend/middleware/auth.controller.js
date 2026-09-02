export default async function ValidateRequest(req, res, next) {
  const JWT_SECRET = process.env.JWT_SECRET;

  const authHeader = String(req.headers.authorization);

  if (!authHeader || !authHeader?.startsWith("Bearer")) {
    return res.status(401).json({
      message: "No token Provided !",
    });
  }

  const token = authHeader.split(" ")[1];
  try {
    const isValid = jwt.verify(token, JWT_SECRET);
    const email = isValid.email;

    const users = db.collection("users");

    const ExistingUser = await users.findOne({ email });

    if (!ExistingUser) {
      res.status(401).json({
        message: "User not Found !",
      });
    }
    req.user = email;
    next();
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error !",
      error: err.message || err
    });
  }

  return res.status(200).json({
    data: {
      email: ExistingUser.email,
      name: ExistingUser.username,
    },
  });
}
