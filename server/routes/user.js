let express = require("express");
const app = express();
const router = express.Router();
const Users = require("../models/UserModel");

let bodyParser = require("body-parser");
app.use(bodyParser.json({ limit: "100mb" }));
app.use(bodyParser.urlencoded({ extended: true }));

router.post("/api/user/signup", (req, res) => {
  let { full_name, user_name, occupation, password } = req.body;

  let temp = { full_name, user_name, occupation, password };

  let errors = "";
  let hasError = false;

  if (!req.body) {
    res.status(400).send({ error: "Request Payload Empty!" });
  }

  if (!full_name) {
    errors = "Full Name missing in the Payload!";
    hasError = true;
  }

  if (!user_name) {
    errors = errors + " user_name missing in the Payload!";
    hasError = true;
  }

  if (!password) {
    errors = errors + " Password missing in the Payload!";
    hasError = true
  }

  if (hasError) {
    res.status(400).send({ error: errors });
    return;
  }

  Users.findOne({ user_name }, (err, user_data) => {
    if (user_data) {
      console.log("User already Exists");
      res.send("User Already Exists").status(401);
      return true;
    } else {
      Users.create(temp, (err, dbData) => {
        console.log(err, dbData);
        res.send({ user_name }).status(201);
      });
    }
  });
});

app.post("/api/user/login", (req, res) => {
  let { user_name, password } = req.body;

  let temp = { user_name, password };

  let errors = "";
  let hasError = false;

  if (!req.body) {
    res.status(400).send({ error: "Request Payload Empty!" });
  }

  if (!user_name) {
    errors = errors + "user_name missing in the Payload!";
  }

  if (!password) {
    errors = errors + " Password missing in the Payload!";
  }

  if (hasError) {
    res.status(400).send({ error: errors });
    return;
  }

  Users.findOne({ user_name }, (err, user_data) => {
    if (user_data) {
      console.log("Welcome");
      res.send("Welcome").status(204);
    } else {
        res.send("Invalid Username/Password Combination!!")
    }
  });
});

module.exports = router;