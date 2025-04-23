const express = require("express");
const router = express.Router();

const {
    createShortUrlController,
    getUserUrlsController,
    getUrlDetailsController,
    deleteUrlController,
    getUrlClicksController
} = require("../controllers/url_controller");

const jwtAuthMiddleware = require("../middlewares/jwt_auth_middleware");

router.use(jwtAuthMiddleware);

router.post("/", createShortUrlController)
router.get("/", getUserUrlsController);
router.get("/:urlId", getUrlDetailsController);
router.delete("/:urlId", deleteUrlController);
router.get("/:urlId/clicks", getUrlClicksController);


module.exports = router;