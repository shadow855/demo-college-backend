const Events = require("../models/event");

//Add Event
const addEvents = async (req, res) => {
    try {
        const { title, description, link, date } = req.body;
        const photo = req.file;

        if (!photo) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const eventsadd = await Events.create({
            photo: {
                data: photo.buffer,
                contentType: photo.mimetype,
            },
            title,
            description,
            link,
            date,
        });

        res.status(200).json(eventsadd);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

//Get Events
const getEvents = async (req, res) => {
    try {
        const getevents = await Events.find();

        const eventsWithPhotos = getevents.map(profile => {
            const base64Photo = profile.photo && profile.photo.data ? profile.photo.data.toString('base64') : null;
            return {
                _id: profile._id,
                title: profile.title,
                description: profile.description,
                link: profile.link,
                date: profile.date,
                photo: base64Photo, // Convert Buffer to base64 string if photo exists
            };
        });

        res.status(200).json(eventsWithPhotos);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

//Get a single Event
const getEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const getevent = await Events.findById(id);
        if (!getEvent) {
            return res.status(404).json(`No Event with id: ${id} is found`);
        }
        res.status(200).json(getEvent);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

//Delete an Event
const deleteEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteevent = await Events.findByIdAndDelete(id);
        if (!deleteEvent) {
            return res.status(404).json(`No Event with id: ${id} is found`);
        }
        res.status(200).send("Event Deleted");
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

//Update an Event
const updateEvent = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(req.body);
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
        const updatedEvent = await Events.findByIdAndUpdate(
            { _id: id }, updateData, { new: true, runValidators: true }
        );

        if (!updateEvent) {
            return res.status(404).json({ error: `No Event with id: ${id} is found` });
        }

        res.status(200).json(updateEvent);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};


module.exports = {
    addEvents,
    getEvents,
    getEvent,
    deleteEvent,
    updateEvent,
}