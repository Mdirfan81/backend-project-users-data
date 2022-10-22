// const express = require("express");
// const fs = require("fs");
import express from "express";
import fs from "fs";

import { createRequire } from "module";
const require = createRequire(import.meta.url);
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
    return fun(parseJsonData, res);
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
            status: 400,
            error: "Error",
          });
        }
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
    data: { myJsonFile },
  });
});

router.get("/getUser/:id", (req, res) => {
  let id = parseInt(req.params.id);

  const found = myJsonFile.some((user) => user.id === id);

  if (found) {
    let data = myJsonFile.filter((user) => user.id === id);
    res.json({ data: data[0] });
  } else {
    res.json({
      data: { status: 400 },
    });
  }
});

router.post("/create", (req, res) => {
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
  let { email } = req.body;
  email = email.toLowerCase();

  const found = myJsonFile.some((user) => user.email.toLowerCase() === email);

  if (found) {
    let data = myJsonFile.filter((user) => user.email.toLowerCase() === email);
    res.json({ data: { status: "success", user: data[0] } });
  } else {
    res.json({
      data: { status: 400 },
    });
  }
});

export default router;
