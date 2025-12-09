const router = require("express").Router();
const drawController = require("../controllers/drawController");

router.post("/", drawController.runDraw);
router.get("/state", drawController.getDrawState);

module.exports = router;
