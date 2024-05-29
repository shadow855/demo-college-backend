const mongoose = require("mongoose");

const announcement = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter announcement"],
        },
    },
    {
        timestamps: true,
    }
);

const Announcement = mongoose.model("Announcement", announcement);
module.exports = Announcement;