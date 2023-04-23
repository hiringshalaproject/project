const connectDb = require('../db/connect');
require("dotenv").config();
require("aws-sdk/lib/maintenance_mode_message").suppress = true;
const express = require("express");
const cors = require("cors");

const app = express();
const port = 8000;
const path = require("path");

const staticPath = (path.join(__dirname, "../../client/build"));
const tasksRouter = require("../routes/tasks");
const jobRouter = require("../routes/jobs");
const employeesRouter = require("../routes/employees");
const seekersRouter = require("../routes/seekers");

app.use(express.static(staticPath));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cors());

app.use("/api/v1/tasks", tasksRouter);
app.use("/api/v1/jobs", jobRouter);
app.use("/api/v1/employees", employeesRouter);
app.use("/api/v1/seekers", seekersRouter);

app.get("/", (req, res) => {
  res.status(200).send("Server Working");
});

app.get("*", (req, res) => {
  res.status(404).send("Bhai Kya kr rha h tu????");
});

const start = async () => {
  try {
    await connectDb(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`listening to youuu on ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
