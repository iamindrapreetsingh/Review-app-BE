let express = require("express");
const app = express();
const router = express.Router();
const Reviews = require("../models/ReviewModel");

let bodyParser = require("body-parser");
const { response } = require("express");
app.use(bodyParser.json({ limit: "100mb" }));
app.use(bodyParser.urlencoded({ extended: true }));


router.get("/api/review", (req,res)=>
{
  Reviews
  .find()
  .populate("products").then(x=>res.send(x));
});


router.post("/api/review/test/test/test/test/test/test/test", (req, res) => {
  let { product_id, product_name, user_name, rating, review } = req.body;

  let temp = { product_id, product_name, user_name, rating, review };

  let errors = "";
  let hasError = false;

  if (!req.body) {
    res.status(400).send({ error: "Request Payload Empty!" });
  }

  if (!product_id) {
    errors = "Product Id missing in the Payload!";
    hasError = true;
  }

  if (!user_name) {
    errors = errors + " User Name in the Payload!";
    hasError = true;
  }

  if (!rating) {
    errors = errors + " Rating missing in the Payload!";
    hasError = true;
  }

  if (hasError) {
    res.status(400).send({ error: errors });
    return;
  }

  Reviews.findOne({ product_id }, (err, reviewEntity) => {
    if (reviewEntity) {
      return reviewEntity;
    }
  }).then((x) => {
    if (x) {
      Reviews.findOne(
        { product_id, "ratings.user_name": user_name },
        (err, userReview) => {
          if (userReview !== null) {
            res.status(404).send("You have already reviewed!");
            return;
          } else {
            const user = {
              user_name,
              rating,
              review,
            };

            Reviews.findOneAndUpdate(
              { product_id },
              {
                $push: {
                  ratings: user,
                },
                $inc: { rating_sum: rating, total_rating_count: 1 },
              },
              { new: true,useFindAndModify: false }
            ).then((x) => {
              res.status(201).send(x);
              return;
            });
          }
        }
      );
    } else {
      temp = {
        product_id,
        product_name,
        total_rating_count: 1,
        rating_sum: rating,
        ratings: [
          {
            user_name,
            rating,
            review,
          },
        ],
      };
      Reviews.create(temp, (err, review_data) => {
        console.log(err, review_data);
        res.send({ review_data }).status(201);
        return;
      });
    }
  });
});

module.exports = router;
