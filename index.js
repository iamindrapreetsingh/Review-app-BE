let express = require("express");
const app = express();
let uuid = require("uuid");
const session = require("express-session");
const db = require("./server/db");
const Users = require("./server/models/UserModel");
const MongoStore = require("connect-mongo");

let bodyParser = require("body-parser");
const { response } = require("express");
app.use(bodyParser.json({ limit: "100mb" }));
app.use(bodyParser.urlencoded({ extended: true }));

const productAPIs = require('./server/routes/product');
const userAPIs = require('./server/routes/user');
const reviewAPIs = require('./server/routes/review');

const api = require("./server/api");

require("dotenv").config();

db.connect({
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
})
  .then((success) => {
    console.log("Connected to MongoAtlas");

    app.use(productAPIs);  
    app.use(userAPIs);
    app.use(reviewAPIs);

    // app.use('/api', sesssion({
    //     genID(){
    //         return uuid();
    //     },
    //     store: new MongoStore({client:db.getClient()}),
    //     secret: process.env.SESSION_SECRET,
    //     resave: true,
    //     saveUninitialized: false
    // } ), api);
  })
  .catch((err) => {
    console.log(`An error occurred:${err}`);
  });

app.get("/", (req, res) => {
  res.send("API is running!!");
});

app.listen(5000, function () {
  console.log("App running");
});
