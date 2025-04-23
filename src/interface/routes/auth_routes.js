const express = require("express")
const router = express.Router();
const { userRegisterController, userLoginController } = require("../controllers/auth_controller");
const { validateRegister, validateLogin } = require("../middlewares/validate_auth")

router.post("/register", validateRegister, userRegisterController);
router.post("/login", validateLogin, userLoginController);

module.exports = router