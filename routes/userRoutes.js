const express = require("express");
const router = express.Router();

const userControllers = require("../controllers/userControllers/authentication");
const auth = require("../middlewares/authenticationMiddleware");
router.post("/api/register", 
    auth.checkNotAuthenticated, userControllers.register);
router.post("/api/login", 
    auth.checkNotAuthenticated, userControllers.login);
router.get("/api/logout", 
    auth.checkAuthenticated, userControllers.logout);

module.exports = router
