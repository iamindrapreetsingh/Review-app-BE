const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
    {

        product_name : {
            type: String,
            required: [true, 'Product Name is requred!!']
        },

        description: {
            type: String,
        },

        average_rating: {
            type: Number,
            default: 0
        },

        total_rating_count: {
            type: Number,
            default: 0
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

        thumbnail_url : {
            type :String
        }
    }
);

const Products = mongoose.model("products",ProductSchema);

module.exports = Products;