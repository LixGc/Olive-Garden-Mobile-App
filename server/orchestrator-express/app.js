require("dotenv").config();
const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 4000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
const errorHandler = require("./middlewares/errorHandlers");
app.use(require("./routes/index"));
app.use(errorHandler);
app.listen(port, () => {
  console.log("app connected to" + port);
});
