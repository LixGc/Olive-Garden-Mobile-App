function errorHandler(error, req, res, next) {
  let status = 500;
  let message = "Internal Server Error";
  console.log(error, "INI ERROR HANDLERR");
  if (error.name === "unauthenticated" || error.name === "JsonWebTokenError") {
    status = 401;
    message = "Invalid Token";
  } else if (error.name === "not_valid") {
    status = 401;
    message = `Invalid email or password`;
  } else if (error.name === "invalid_email_or_password") {
    status = 400;
    message = "Email or Password is required";
  } else if (error.name === "SequelizeUniqueConstraintError" || error.name === "SequelizeValidationError" || error.name === "ValidationErrorItem") {
    status = 400;
    message = error.errors[0].message;
  } else if (error.name === "Menu not found") {
    status = 404;
    message = error.name;
  } else if (error.name === "ingredient_empty") {
    status = 400;
    message = "Ingredient musn't be empty!";
  } else if (error.name === "Category not found") {
    status = 404;
    message = error.name;
  }
  res.status(status).json({ message });
}

module.exports = errorHandler;
