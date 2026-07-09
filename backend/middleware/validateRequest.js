export const validate = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next() // If valid, move to controller
  } catch (err) {
    console.error("Validation error:", err);
    res.status(400).json({
      message: "Validation Error",
      errors: err.errors || err
    });
  }
}