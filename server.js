// import express from "express"
// const router = express();
import mongoose from "mongoose"

import app from "./app.js";

const port = 3000;

mongoose
  .connect("mongodb://127.0.0.1:27017/Task_Master")
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.log("DB connection error:", err);
  });

app.listen(port, ()=>{
    console.log(`server is rumnning on port ${port}`);
    
})