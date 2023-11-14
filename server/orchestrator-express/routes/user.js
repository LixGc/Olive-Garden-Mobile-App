const express = require("express");
const UserController = require("../controllers/userControllers");
const router = express.Router();

router.get("/users", UserController.findAll);
router.get("/users/:id", UserController.findByPk);
router.post("/users", UserController.register);
router.delete("/users/:id", UserController.delete);
module.exports = router;
