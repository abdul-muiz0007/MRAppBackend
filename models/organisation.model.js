const mongoose = require("mongoose");

const organisationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    number: {
      type: Number,
    },
    role: {
      type: String,
      enum: ["admin"],
      default: "admin",
      required: true,
    }
  },

  {
    timestamps: true,
  }
);

const Organisation = mongoose.model("Organisation", organisationSchema);

module.exports = Organisation;
