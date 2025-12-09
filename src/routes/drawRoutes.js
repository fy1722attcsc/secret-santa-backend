const router = require("express").Router();
const controller = require("../controllers/drawController");

router.post("/", controller.runDraw);

module.exports = router;
