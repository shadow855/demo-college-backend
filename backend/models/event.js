const mongoose = require("mongoose");

const events = mongoose.Schema(
    {
        photo: {
            data: Buffer, // Store image data as a Buffer
            contentType: String, // Store MIME type of the image
        },
        title: {
            type: String,
            required: [true, "Please enter title"],
        },
        description: {
            type: String,
            required: [true, "Please enter description"],
        },
        link: {
            type: String,
            required: [true, "Please enter link"],
        },
        date: {
            type: String,
            required: [true, "Please enter date"],
        },
    },
    {
        timestamps: true,
    }
);

const Events = mongoose.model("Events", events);
module.exports = Events;