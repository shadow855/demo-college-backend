const mongoose = require("mongoose");

const teacher = mongoose.Schema(
    {
        photo: {
            data: Buffer, // Store image data as a Buffer
            contentType: String, // Store MIME type of the image
        },
        name: {
            type: String,
            required: [true, "Please enter name"],
        },
        designation: {
            type: String,
            required: [true, "Please enter batch"],
        },
        contact: {
            type: Number,
            required: [true, "Please enter contactno."],
        },
        email: {
            type: String,
            required: [true, "Please enter email"],
        },
    },
    {
        timestamps: true,
    }
);

const Teacher = mongoose.model("Teacher", teacher);
module.exports = Teacher;