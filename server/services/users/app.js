require("dotenv").config();
const express = require("express");
const { connect } = require("./config/mongo");

const app = express();
const port = process.env.PORT || 4001;

app.use(express.json());
const errorHandler = require("./middlewares/errorHandlers");
app.use(express.urlencoded({ extended: true }));
app.use(require("./routes/index"));
app.use(errorHandler);
connect().then(() => {
  app.listen(port, () => {
    console.log("app connected to" + port);
  });
});
