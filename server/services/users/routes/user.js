const express = require("express");
const UserController = require("../controllers/userControllers");
const router = express.Router();

router.get("/users", UserController.findAll);
router.post("/users", UserController.register);
router.get("/users/:id", UserController.findByPk);
router.delete("/users/:id", UserController.delete);
module.exports = router;
