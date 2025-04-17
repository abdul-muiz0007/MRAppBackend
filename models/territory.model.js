const mongoose = require("mongoose");
const Counter = require("./counter");

const territorySchema = mongoose.Schema(
  {
    territoryID: {
      type: String,
    },

    territoryName: {
      type: String,
      required: [true, "Please enter territory name"],
    },

    organisation: {
      type: String
    },

    taggedUsers: {
      type: [String], 
      default: []
    }

  },
  {
    timestamps: true,
  }
);

territorySchema.pre('save', async function(next) {
    const doc = this;
  
    if (doc.isNew && !doc.territoryID) {
      try {
        const counter = await Counter.findOneAndUpdate(
          { _id: 'territoryID' },
          { $inc: { seq: 1 } },
          { new: true, upsert: true }
        );
  
        const formattedId = `PTH${counter.seq.toString().padStart(3, '0')}`;
        doc.territoryID = formattedId;
  
        next();
      } catch (err) {
        next(err);
      }
    } else {
      next();
    }
  });

  const Territory = mongoose.model("Territory", territorySchema);
  module.exports = Territory;