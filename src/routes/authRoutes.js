const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/", authController.loginUser);
// router.post("/search", usersController.readUserByName);
// router.get("/", usersController.readALLUser);
// router.put("/:id", usersController.updateUser);
// router.delete("/:id", usersController.deleteUser);

module.exports = router;
