const express = require("express");

const { addEvents, getEvents, getEvent, deleteEvent, updateEvent } = require("../controller/eventController");
const multer = require("multer");

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


router.post("/", upload.single("photo"), addEvents); // New route for image upload

//Get/Read job profile data from database
router.get("/", getEvents);
router.get("/:id", getEvent);
router.delete("/:id", deleteEvent);
router.put("/:id", upload.single('photo'), updateEvent);



module.exports = router;