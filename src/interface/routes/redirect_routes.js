const express = require('express');
const router = express.Router();

const { urlRedirectController } = require("../controllers/redirect_controller");

router.get("/:code", urlRedirectController);

module.exports = router;
