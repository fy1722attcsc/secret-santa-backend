const router = require("express").Router();
const controller = require("../controllers/participantController");

router.post("/register", controller.register);
router.get("/verify", controller.verify);
router.get("/verified/all", controller.getAllVerified);

module.exports = router;
