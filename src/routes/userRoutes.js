const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const validate = require("../middlewares/validation");

// Get All Users
router.get("/", userController.getAllUsers);

// Get user by ID
router.get("/:userId", userController.getUserById);

// Create new user
router.post("/", validate.validateUser, userController.createUser);

// Update user
router.patch("/:userId", userController.updateUser);

// Delete user
router.delete("/:userId", userController.deleteUser);

module.exports = router;
