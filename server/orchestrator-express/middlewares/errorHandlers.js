function errorHandler(error, req, res, next) {
  let status = 500;
  let message = "Internal Server Error";
  console.log(error, "INI ERROR HANDLERR");
  if (error.message === "Request failed with status code 400") {
    status = 400;
    message = error.response.data.message;
  } else if (error.message === "Request failed with status code 404") {
    status = 404;
    message = error.response.data.message;
  }
  res.status(status).json({ message });
}

module.exports = errorHandler;
