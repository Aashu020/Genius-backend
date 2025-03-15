const mongoose = require("mongoose");

// const URL = "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.3.2";
const URL ="mongodb+srv://root:root@cluster0.ca2cg9i.mongodb.net/geniustestingv3?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(URL)
  .then(() => console.log("!!MongoDB Connected!!"))
  .catch((error) => console.log(error));
