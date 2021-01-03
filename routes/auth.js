const express = require("express");
const { validateUser, register, login, deleteUser } = require("../controllers/auth");
const { protect } = require("../middleware/index").auth;

const router = express.Router();

router.post("/validate", validateUser);
router.post("/register", register);
router.post("/login", login);
router.delete("/deleteuser", protect, deleteUser);

module.exports = router;
