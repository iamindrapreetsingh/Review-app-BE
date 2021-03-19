const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsersSchema = new Schema(
    {

        full_name : {
            type: String,
            required: [true, 'Full Name is requred!!']
        },

        user_name : {
            type: String,
            required : [true, "Username is required!!"]
        },

        occupation: {
            type: String
        },

        is_admin: {
            type: Boolean,
            default: false
        },

        password: {
            type: String,
            required: [true, "Password is required!!"]
        }



    }
);

const Users = mongoose.model("users",UsersSchema);

module.exports = Users;