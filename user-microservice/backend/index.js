const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const loginRoute = require("./routes/login")
const registerRoute = require("./routes/register")
require("dotenv").config();

const PORT = 8085;
const app = express();
app.use(express.json());
app.use(cors({
    origin: "http://user.local",
    credentials: true
}));


mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Connection to database successful ! ");
}).catch((err) => {
    console.log("Connection to database has failed ! " + err);
})



app.use('/auth',registerRoute)
app.use('/auth',loginRoute)
app.listen(PORT, () => {
    console.log(`Server listening to the PORT : ${PORT}`);
})
