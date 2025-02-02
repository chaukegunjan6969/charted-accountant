/// dependencies

const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

///Imports
const dbConnect = require("./Config/dbconnect");

//Import different Route Files
const registerRoutes = require("./Routes/registerRoutes");
const loginRoutes = require("./Routes/loginRoutes");

dbConnect();
const app = express();

//used to parse req.body in express -> PUT or POST
const bodyParser = require("body-parser");

//specifically parse JSON data & add it to the request.Body object
app.use(bodyParser.json());

dotenv.config();
app.use(cors());

const PORT = process.env.PORT || 4000;

app.get("/", (req, res) => {
  res.send("<h1>Welcome to the backend </h1>");
});

//different Routes configurations
app.use("/api/register", registerRoutes);
app.use("/api/login", loginRoutes);

app.listen(PORT, console.log(`server listening on ${PORT}`));

// dbConnect();
