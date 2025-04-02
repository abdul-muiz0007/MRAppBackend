const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter user name"],
    },

    password: {
      type: String,
      required: [true, "Please enter user password"],
    },

    email: {
      type: String
    },

    address: {
      type: String
    },

    number: {
      type: Number
    },

    organisation: {
      type: String
    },
  },
  
  {
    timestamps: true,
  }
  
);


const User = mongoose.model("User", UserSchema);
module.exports = User;