require("dotenv").config();
const express = require("express");
const db = require("./db/dbConnection");
const app = express();
const userRoutes = require("./routes/userRoutes");
const availabilityRoutes = require("./routes/availabilityRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const ifError = require("./middlewares/errorMiddleware");
const port = 3000;

app.get("/", (req, res) => {
    res.send("hello world");
})


app.use(express.json());
app.use(userRoutes);
app.use(availabilityRoutes);
app.use(bookingRoutes);
app.use(ifError);

app.listen(port, () => {
    console.log(`app is listtening on port: ${port}`);
})