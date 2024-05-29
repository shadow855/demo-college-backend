const Announcement = require("../models/announcement");

//Add Announcement
const addAnnouncement = async (req, res) => {
    try {
        const { name } = req.body;

        const announcementadd = await Announcement.create({
            name,
        });

        res.status(200).json(announcementadd);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

//Get Announcements
const getAnnouncements = async (req, res) => {
    try {
        const getannouncements = await Announcement.find();

        const allannouncements = getannouncements.map(announcement => {
            return {
                _id: announcement._id,
                name: announcement.name,
            };
        });

        res.status(200).json(allannouncements);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

//Delete an Announcement
const deleteAnnouncement = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteannouncement = await Announcement.findByIdAndDelete(id);
        if (!deleteannouncement) {
            return res.status(404).json(`No Announcement with id: ${id} is found`);
        }
        res.status(200).send("Announcement Deleted");
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

//Update an Announcement
const updateAnnouncement = async (req, res) => {
    try {
        const { id } = req.params;
        const updateannouncement = await Announcement.findByIdAndUpdate(
            { _id: id }, req.body, { new: true, runValidators: true }
        );
        if (!updateannouncement) {
            return res.status(404).json(`No Announcement with id: ${id} is found`);
        }
        res.status(200).json(updateannouncement);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

module.exports = {
    addAnnouncement,
    getAnnouncements,
    deleteAnnouncement,
    updateAnnouncement,
}