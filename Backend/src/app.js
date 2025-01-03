const express = require("express");
const cors = require("cors");
const { connectDb } = require("./config/database");
const  cookieParser = require("cookie-parser");

const authRouter = require("./routes/auth");
const profileRoute = require("./routes/profile");

const app = express();


app.use(cors({ origin: "*", methods: ["GET", "POST", "PUT", "DELETE"], credentials: true }));
app.use(express.json());
app.use(cookieParser());


app.use("/", authRouter);
app.use("/", profileRoute);


connectDb()
    .then(() => {
        console.log("Database is connected...");
        const PORT = process.env.PORT || 1234;
        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}...`);
        });
    })
    .catch((err) => {
        console.error("Error:", err.message);
    });
