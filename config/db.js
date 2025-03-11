const mongoose = require("mongoose");

// const URL = "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.3.2";
const URL =
  "mongodb://127.0.0.1:27017/geniusClasses?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.3.8";

mongoose
  .connect(URL)
  .then(() => console.log("!!MongoDB Connected!!"))
  .catch((error) => console.log(error));
