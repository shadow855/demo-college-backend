const express = require("express");
// const JobProfile = require("../models/jobProfile");
const { addJobProfile, getJobProfiles, getJobProfile, deleteJobProfile, updateJobProfile } = require("../controller/jobProfileController");
const multer = require("multer");

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

//Add a Job Profile
// router.post("/api/jobprofileadd", /*logger,*/ async (req, res) => {
//     // console.log(req.body);
//     // res.send("Job Profile Added");
//     try {
//         const jobprofileadd = await JobProfileAdd.create(req.body);
//         res.status(200).json(jobprofileadd);
//     } catch (error) {
//         res.status(500).json({ msg: error.message });
//     }
// });

//Or shortcut method using controller            
// router.post("/api/jobprofile", addJobProfile);

//Another more shortcut method by changing middleware
// router.post("/", addJobProfile); // Old route without image upload
router.post("/", upload.single("photo"), addJobProfile); // New route for image upload

//Get/Read job profile data from database
router.get("/", getJobProfiles);
router.get("/:id", getJobProfile);
router.delete("/:id", deleteJobProfile);
router.put("/:id", upload.single('photo'), updateJobProfile);

//another more shortcut for routes
// router.route("/").get(getJobProfiles).post(addJobProfile);
// router.route("/:id").get(getJobProfile).delete(deleteJobProfile).put(updateJobProfile);

module.exports = router;