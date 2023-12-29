require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./db/connectDB");
const PORT = Number(process.env.PORT);

const app = express();
//view engine
app.set("view engine", "pug");
app.set("views", "./view");
//static seclaration
app.use(express.static("./view"));
//bodyparser middleware
app.use(express.urlencoded({ extended: false })); //query format of incoming data
app.use(express.json()); //receive json format data
//import router module
app.use(`/`, require("./router/contactViewRoute"));
app.use("/api/contact", require("./router/contactRoute"));
//default route
app.all(`*`, (req, res) => {
  res.status(404).json({ msg: `Requset not found,try /api/contact` });
});
//server listen

app.listen(PORT, () => {
  connectDB();
  console.log(`server is running at @ http://localhost:${PORT}`);
});
