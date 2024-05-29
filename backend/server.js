const dotenv = require("dotenv").config();
const express = require("express");
const connectDB = require("./config/connectDB");
// const JobProfile = require("./models/jobProfile");
const jobProfileRoutes = require("./routes/jobProfileRoute");
const announcementRoutes = require("./routes/announcementRoute");
const teacherRoutes = require("./routes/teacherRoute");
const eventRoutes = require('./routes/eventRoute')
const cors = require("cors");

const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: '50mb' }));

//Middleware example
// const logger = (req, res, next) => {
//     console.log("Middleware ran");
//     console.log(req.method);
//     next();
// };

//Middleware
// app.use(express.json());

//Another middleware example
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));
app.use(jobProfileRoutes);
app.use(announcementRoutes);
app.use(teacherRoutes);
app.use(cors({
    origin: ["http://localhost:3000", "https://dept-finance.onrender.com"]
}));
app.use("/api/jobprofile", jobProfileRoutes);
app.use("/api/announcement", announcementRoutes);
app.use("/api/teacher", teacherRoutes);
app.use('/api/events', eventRoutes)

//Routes
app.get("/", (req, res) => {
    res.send("Home Page");
})

const PORT = process.env.PORT || 5000;


const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`)
        });
    } catch (error) {
        console.log(error);
    }
};

startServer();