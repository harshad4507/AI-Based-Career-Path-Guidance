const express = require("express")
const router = express.Router()

const { auth } = require("../middlewares/auth");
const { getTopics ,getAllDetails} = require("../controllers/ResourceController");

router.post("/getTopics", getTopics);
router.post("/getAllDetails", getAllDetails);

module.exports = router;