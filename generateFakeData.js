// const faker = require("faker");
// const fs = require("fs");
import faker from "faker";
import fs from "fs";

function createRandomUser() {
  const Users = [];
  for (let i = 0; i < 100; i++) {
    let obj = {
      id: i + 1,
      email: faker.internet.email(),
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      avatar: faker.image.avatar(),
    };
    Users.push(obj);
  }
  fs.writeFileSync("userData.json", JSON.stringify(Users, null, "\t"));

  console.log("Process completed");
}

createRandomUser();
