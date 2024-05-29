const JobProfile = require("../models/jobProfile");

//Add Job Profile
const addJobProfile = async (req, res) => {
    try {
        const { name, batch, company, position, address, contact, email, experience } = req.body;
        const photo = req.file;

        if (!photo) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const jobprofileadd = await JobProfile.create({
            photo: {
                data: photo.buffer,
                contentType: photo.mimetype,
            },
            name,
            batch,
            company,
            position,
            address,
            contact,
            email,
            experience,
        });

        res.status(200).json(jobprofileadd);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

//Get Job Profiles
const getJobProfiles = async (req, res) => {
    try {
        const getjobprofiles = await JobProfile.find();

        const profilesWithPhotos = getjobprofiles.map(profile => {
            const base64Photo = profile.photo && profile.photo.data ? profile.photo.data.toString('base64') : null;
            return {
                _id: profile._id,
                name: profile.name,
                batch: profile.batch,
                company: profile.company,
                position: profile.position,
                address: profile.address,
                contact: profile.contact,
                email: profile.email,
                experience: profile.experience,
                photo: base64Photo, // Convert Buffer to base64 string if photo exists
            };
        });

        res.status(200).json(profilesWithPhotos);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

//Get a single Job Profile
const getJobProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const getjobprofile = await JobProfile.findById(id);
        if (!getjobprofile) {
            return res.status(404).json(`No Job Profile with id: ${id} is found`);
        }
        res.status(200).json(getjobprofile);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

//Delete a Job Profile
const deleteJobProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const deletejobprofile = await JobProfile.findByIdAndDelete(id);
        if (!deletejobprofile) {
            return res.status(404).json(`No Job Profile with id: ${id} is found`);
        }
        res.status(200).send("Job Profile Deleted");
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

//Update a Job Profile
const updateJobProfile = async (req, res) => {
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

        // Update the job profile
        const updatedJobProfile = await JobProfile.findByIdAndUpdate(
            { _id: id }, updateData, { new: true, runValidators: true }
        );

        if (!updatedJobProfile) {
            return res.status(404).json({ error: `No Job Profile with id: ${id} is found` });
        }

        res.status(200).json(updatedJobProfile);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};


module.exports = {
    addJobProfile,
    getJobProfiles,
    getJobProfile,
    deleteJobProfile,
    updateJobProfile,
}