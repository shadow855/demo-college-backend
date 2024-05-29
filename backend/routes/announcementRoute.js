const express = require("express");
const { addAnnouncement, getAnnouncements, deleteAnnouncement, updateAnnouncement } = require("../controller/announcementController");
const router = express.Router();

router.post("/", addAnnouncement);
router.get("/", getAnnouncements);
router.delete("/:id", deleteAnnouncement);
router.put("/:id", updateAnnouncement);

module.exports = router;