require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
var cors = require("cors");

//Database connection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("DB contacts CONNECTED");
  });

//connection
const port = 4000;
app.listen(port, () => {
  console.log(`App is running at ${port}`);
});

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(cookieParser());

var corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

//my routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

//basic route
app.get("/", (req, res) => {
  res.send("#contacts");
});

//api Routes
app.use("/api", authRoutes);
app.use("/api", userRoutes);
