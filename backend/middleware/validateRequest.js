export const validate = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next() // If valid, move to controller
  } catch (err) {
    res.status(404).json({
      message: "Validation Error",
      errors: err
    })
  }
}