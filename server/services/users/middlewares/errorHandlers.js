function errorHandler(error, req, res, next) {
  let status = 500;
  let message = "Internal Server Error";
  console.log(error, "INI ERROR HANDLERR");
  if (error.name === "Data not found!") {
    status = 404;
    message = "Data not found!";
  } else if (error.name === "BSONError") {
    status = 400;
    message = "input must be a 24 character hex string, 12 byte Uint8Array, or an integer";
  } else if (error.name === "not_valid") {
    status = 400;
    message = "All input field must be filled!";
  } else if (error.name === "Email already exist!") {
    status = 400;
    message = "Email already exist!";
  }
  res.status(status).json({ message });
}

module.exports = errorHandler;
