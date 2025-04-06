const mongoose = require("mongoose");
const Counter = require("./counter");

const territorySchema = mongoose.Schema(
  {
    territoryID: {
      type: String,
      unique: true,
    },

    territoryName: {
      type: String,
      required: [true, "Please enter territory name"],
    },

    territoryCode: {
      type: String,
      required: [true, "Please enter territory code"],
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