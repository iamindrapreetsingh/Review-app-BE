let express = require("express");
const app = express();
const router = express.Router();
const Products = require("../models/productModel");

let bodyParser = require("body-parser");
app.use(bodyParser.json({ limit: "100mb" }));
app.use(bodyParser.urlencoded({ extended: true }));

let response;

let finalResponse = (data) => {
  let finalResponse = [];
  data.forEach((element) => {
    response = {
      _id: element._id,
      total_rating_count: element.total_rating_count,
      product_name: element.product_name,
      description: element.description,
      thumbnail_url: element.thumbnail_url,
      rating_sum: element.rating_sum,
    };
    for(let elem of element.ratings)
    {
      if(elem.user_name==="ashhad")
      {
        response.user_name = elem.user_name;
        response.rating = elem.rating;
        response.review = elem.review;
        break;
      }
    }
    finalResponse.push(response);
  });
  return finalResponse;
};

router.post("/api/product", (req, res) => {
  let {
    product_name,
    description,
    average_rating,
    total_rating_count,
    thumbnail_url,
  } = req.body;

  let temp = {
    product_name,
    description,
    average_rating,
    total_rating_count,
    thumbnail_url,
  };

  let errors = "";
  let hasError = false;

  if (!req.body) {
    res.status(400).send({ error: "Request Payload Empty!" });
  }

  if (!product_name) {
    errors = "Product Rating missing in the Payload!";
    hasError = true;
  }

  if (!thumbnail_url) {
    errors = errors + " Thumbnail URL missing in the Payload!";
    hasError = true;
  }

  if (hasError) {
    res.status(400).send({ error: errors });
    return;
  }

  Products.findOne({ product_name }, (err, product_data) => {
    if (product_data) {
      console.log("Product already Exists");
      res.send("Product Already Exists").status(401);
      return true;
    } else {
      Products.create(temp, (err, dbData) => {
        console.log(err, dbData);
        res.send({ product_name }).status(201);
      });
    }
  });
});

router.get("/api/product", (req, res) => {
  Products.find().then((x) => {
    res.status(201).send(finalResponse(x));
    return;
  });
});

router.post("/api/review", (req, res) => {
  let { _id, product_name, user_name, rating, review } = req.body;

  let temp = { _id, product_name, user_name, rating, review };

  let errors = "";
  let hasError = false;

  if (!req.body) {
    res.status(400).send({ error: "Request Payload Empty!" });
  }

  if (!_id) {
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

  Products.findOne({ _id }, (err, reviewEntity) => {
    if (reviewEntity) {
      return reviewEntity;
    }
  }).then((x) => {
    if (x) {
      Products.findOne(
        { _id, "ratings.user_name": user_name },
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

            Products.findOneAndUpdate(
              { _id },
              {
                $push: {
                  ratings: user,
                },
                $inc: { rating_sum: rating, total_rating_count: 1 },
              },
              { new: true, useFindAndModify: false }
            ).then((x) => {
              res.status(201).send(x);
              return;
            });
          }
        }
      );
    } else {
      res.send("Movie not found!!").status(404);
    }
  });
});

module.exports = router;
