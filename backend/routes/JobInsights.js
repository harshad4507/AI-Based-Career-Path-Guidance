const express = require("express")
const router = express.Router()

const { auth } = require("../middlewares/auth");
const { scrapeLinkedInJobs } = require('../controllers/JobInsights')

router.post("/scrapeLinkedInJobs" , scrapeLinkedInJobs);

module.exports = router;