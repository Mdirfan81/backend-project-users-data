// const express = require("express");
import express from "express";
import user from "./controllers/user.js";

const app = express();
app.use(express.json());

const port = process.env.PORT || "5000";

app.use("/api", user);
app.listen(port, () => {
  console.log(`Server started on ${port}`);
});
