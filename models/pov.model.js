const mongoose = require("mongoose");
const Counter = require('./counter');

const POVSchema = mongoose.Schema(
  {
    povID: {
      type: String,
      unique: true
    },

    povType: {
       type: String,
       enum: ['Doctor', 'Pharmacy', 'Distributor', 'Hospital']
    },

    name: {
      type: String,
      required: [true, "Please enter pov name"],
    },

    address: {
      type: String,
      required: [true, "Please enter pov address"],
    },

    contactPerson: {
      type: String,
      required: [true, "Please enter pov contact person"],
    },

    number: {
      type: Number
    },

    taggedTerritory: {
      type: String,
      ref: "Territory",
    },

    organisation: {
      type: String
    },

    lastVisitDate: {
      type: Date
    },
  },
  
  {
    timestamps: true,
  }
  
);

POVSchema.pre('save', async function(next) {
    const doc = this;
  
    if (doc.isNew && !doc.povID) {
      try {
        const counter = await Counter.findOneAndUpdate(
          { _id: 'povID' },
          { $inc: { seq: 1 } },
          { new: true, upsert: true }
        );
  
        const formattedId = `POV${counter.seq.toString().padStart(3, '0')}`;
        doc.povID = formattedId;
  
        next();
      } catch (err) {
        next(err);
      }
    } else {
      next();
    }
  });

const POV = mongoose.model("POV", POVSchema);
module.exports = POV;