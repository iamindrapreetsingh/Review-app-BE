const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  product_id: {
    type: Schema.Types.ObjectId,
    ref: "products",
  },

  product_name: {
    type: String,
    unique: true,
    required: [true, "Product Name is requred!!"],
  },

  total_rating_count: {
    type: Number,
    default: 0,
  },

  rating_sum: {
    type: Number,
    default: 0,
  },

  ratings: [
    {
      user_name: {
        type: String,
        unique: true,
      },
      rating: Number,
      review: {
        type: String,
      },
    },
  ],
});

const Reviews = mongoose.model("reviews", ReviewSchema);

module.exports = Reviews;
