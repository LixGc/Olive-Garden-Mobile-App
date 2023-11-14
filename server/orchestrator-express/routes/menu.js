const express = require("express");

const MenuControllers = require("../controllers/MenuControllers");

const router = express.Router();

router.get("/menus", MenuControllers.findAllMenu);
router.get("/menus/:id", MenuControllers.findMenuById);
router.post("/menus", MenuControllers.addMenu);
router.put("/menus/:id", MenuControllers.editMenu);
router.delete("/menus/:id", MenuControllers.deleteMenu);

module.exports = router;
