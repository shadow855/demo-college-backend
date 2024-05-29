const mongoose = require("mongoose");

const jobProfile = mongoose.Schema(
    {
        photo: {
            data: Buffer, // Store image data as a Buffer
            contentType: String, // Store MIME type of the image
        },
        name: {
            type: String,
            required: [true, "Please enter name"],
        },
        batch: {
            type: String,
            required: [true, "Please enter batch"],
        },
        company: {
            type: String,
            required: [true, "Please enter company name"],
        },
        position: {
            type: String,
            required: [true, "Please enter position"],
        },
        address: {
            type: String,
            required: [true, "Please enter address"],
        },
        contact: {
            type: Number,
            required: [true, "Please enter contactno."],
        },
        email: {
            type: String,
            required: [true, "Please enter email"],
        },
        experience: {
            type: String,
            required: [true, "Please enter experience"],
        },
    },
    {
        timestamps: true,
    }
);

const JobProfile = mongoose.model("JobProfile", jobProfile);
module.exports = JobProfile;