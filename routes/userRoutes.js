const express = require("express");
const router = express.Router();

const userControllers = require("../controllers/userControllers/authentication");


router.post("/api/register", userControllers.register);
router.post("/api/login", userControllers.login);
router.get("/api/logout", userControllers.logout);

module.exports = router
