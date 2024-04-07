const express = require("express");
const router = express.Router();

const userControllers = require("../controllers/userControllers/authentication");


router.post("/register", userControllers.register);
router.post("/login", userControllers.login);
router.get("/logout", userControllers.logout);

module.exports = router
