const Teacher = require("../models/teacher");

//Add Teacher Profile
const addTeacherProfile = async (req, res) => {
    try {
        const { name, designation, contact, email } = req.body;
        const photo = req.file;

        if (!photo) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const teacherprofileadd = await Teacher.create({
            photo: {
                data: photo.buffer,
                contentType: photo.mimetype,
            },
            name,
            designation,
            contact,
            email,
        });

        res.status(200).json(teacherprofileadd);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

//Get Teacher Profiles
const getTeacherProfiles = async (req, res) => {
    try {
        const getteacherprofiles = await Teacher.find();

        const profilesWithPhotos = getteacherprofiles.map(profile => {
            const base64Photo = profile.photo && profile.photo.data ? profile.photo.data.toString('base64') : null;
            return {
                _id: profile._id,
                name: profile.name,
                designation: profile.designation,
                contact: profile.contact,
                email: profile.email,
                photo: base64Photo, // Convert Buffer to base64 string if photo exists
            };
        });

        res.status(200).json(profilesWithPhotos);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

//Get a single Teacher Profile
const getTeacherProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const getteacherprofile = await Teacher.findById(id);
        if (!getteacherprofile) {
            return res.status(404).json(`No Teacher Profile with id: ${id} is found`);
        }
        res.status(200).json(getteacherprofile);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

//Delete a Teacher Profile
const deleteTeacherProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteteacherprofile = await Teacher.findByIdAndDelete(id);
        if (!deleteteacherprofile) {
            return res.status(404).json(`No Teacher Profile with id: ${id} is found`);
        }
        res.status(200).send("Teacher Profile Deleted");
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

//Update a Teacher Profile
const updateTeacherProfile = async (req, res) => {
    try {
        const { id } = req.params;
        let updateData = req.body; // Get the update data from the request body

        // Check if a file is uploaded
        if (req.file) {
            // If a file is uploaded, update the photo field
            updateData.photo = {
                data: req.file.buffer,
                contentType: req.file.mimetype,
            };
        } else {
            // If no file is uploaded, remove the photo field from updateData
            delete updateData.photo;
        }

        const updateteacherprofile = await Teacher.findByIdAndUpdate(
            { _id: id }, req.body, { new: true, runValidators: true }
        );
        if (!updateteacherprofile) {
            return res.status(404).json(`No Teacher Profile with id: ${id} is found`);
        }
        res.status(200).json(updateteacherprofile);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};


module.exports = {
    addTeacherProfile,
    getTeacherProfiles,
    getTeacherProfile,
    deleteTeacherProfile,
    updateTeacherProfile,
}