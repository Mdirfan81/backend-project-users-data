// const express = require("express");
// const fs = require("fs");
import express from "express";
import fs from "fs";
// const fileData = require("../userData.json");

// const readFile = require("../middleware/readFile");
// const writeFile = require("../middleware/writeFile");
// import readFile from "../middleware/readFile.js";
// import writeFile from "../middleware/writeFile.js";
// import userDataFile from ".././userData.json";
import { createRequire } from "module"; // Bring in the ability to create the 'require' method
const require = createRequire(import.meta.url); // construct the require method
const myJsonFile = require("../userData.json");

const router = express.Router();

function readJsonFile(data, fun, res) {
  fs.readFile("./userData.json", "utf8", (error, fileData) => {
    if (error) {
      console.log("Error", error);
      return;
    }
    let parseJsonData = JSON.parse(fileData);
    parseJsonData.push(data);
    // console.log("Here", parseJsonData);
    return fun(parseJsonData, res);
    // return;
    // return JSON.parse(fileData);
  });
}

function writeJsonFile(newFileData, response) {
  try {
    fs.writeFile(
      "./userData.json",
      JSON.stringify(newFileData, null, 2),
      (err) => {
        if (err) {
          //   console.log("Error");
          response.json({
            statusCode: 400,
            error: "Error",
          });
        }
        // console.log("Successfull");
        response.json({ status: "success" });
      }
    );
  } catch (error) {
    console.error(error);
  }
}

router.get("/allUsers", (req, res) => {
  res.json({
    page: 1,
    per_page: 10,
    total: 10,
    total_pages: 5,
    "data ": myJsonFile,
  });
});

router.get("/getUser/:id", (req, res) => {
  let id = parseInt(req.params.id);

  const found = myJsonFile.some((user) => user.id === id);

  if (found) {
    let data = myJsonFile.filter((user) => user.id === id);
    res.json({ data: data[0] });
  } else {
    res.sendStatus(400);
  }
});

router.post("/create", (req, res) => {
  //   const content = fs.readFileSync("./userData.json"); // read the file content as string
  //   const obj = JSON.parse(myJsonFile); // convert string to object
  //   const length = obj.items.length;

  //   let newArr = [...myJsonFile];
  //   console.log(newArr, typeof newArr);
  let key = Object.keys(myJsonFile);
  let pop = key.pop();
  let { firstName, lastName, email } = req.body;
  let newUser = {
    id: parseInt(pop) + 2,
    first_name: firstName,
    last_name: lastName,
    email: email,
  };
  readJsonFile(newUser, writeJsonFile, res);
  //   res.json({ data: myJsonFile });
});

router.put("/update/:id", (req, res) => {
  const found = myJsonFile.some((user) => user.id === parseInt(req.params.id));

  if (found) {
    const { firstName, lastName, email, avatar } = req.body;

    myJsonFile.forEach((user) => {
      if (user.id === parseInt(req.params.id)) {
        user.first_name = firstName ? firstName : user.first_name;
        user.last_name = lastName ? lastName : user.last_name;
        user.email = email ? email : user.email;
        user.avatar = avatar ? avatar : user.avatar;
      }
    });
    writeJsonFile(myJsonFile, res);
  } else {
    res.sendStatus(400);
  }
});

router.delete("/delete/:id", (req, res) => {
  const found = myJsonFile.some((user) => user.id === parseInt(req.params.id));

  if (found) {
    let newData = myJsonFile.filter(
      (user) => user.id !== parseInt(req.params.id)
    );
    writeJsonFile(newData, res);
  } else {
    res.sendStatus(400);
  }
});

router.post("/auth", (req, res) => {
  //   let id = req.params.email;
  //   id = id.toLowerCase();
  let { email } = req.body;
  email = email.toLowerCase();
  //   console.log(email);
  //   res.send(id);
  const found = myJsonFile.some((user) => user.email.toLowerCase() === email);

  if (found) {
    let data = myJsonFile.filter((user) => user.email.toLowerCase() === email);
    res.json({ data: { status: "success", user: data[0] } });
  } else {
    res.sendStatus(400);
  }
});

export default router;
