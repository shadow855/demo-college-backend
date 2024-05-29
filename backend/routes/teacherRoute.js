const express = require("express");
const { addTeacherProfile, getTeacherProfiles, getTeacherProfile, deleteTeacherProfile, updateTeacherProfile } = require("../controller/teacherController");
const multer = require("multer");

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/", upload.single("photo"), addTeacherProfile); // New route for image upload

router.get("/", getTeacherProfiles);
router.get("/:id", getTeacherProfile);
router.delete("/:id", deleteTeacherProfile);
router.put("/:id", upload.single('photo'), updateTeacherProfile);

module.exports = router;