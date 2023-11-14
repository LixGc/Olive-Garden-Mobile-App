const express = require("express");

const MenuController = require("../controllers/MenuControllers");

const router = express.Router();

router.get("/menus", MenuController.menus);
router.get("/menus/:id", MenuController.menuById);
router.post("/menus", MenuController.addMenu);
router.put("/menus/:id", MenuController.editMenu);
router.delete("/menus/:id", MenuController.deleteMenu);

module.exports = router;
