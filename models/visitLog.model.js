const mongoose = require("mongoose");
const Counter = require('./counter')

const VisitLogSchema = mongoose.Schema(
  {
    visitID: {
      type: String,
      unique: true
    },

    povID: {
      type: String,
      ref: "POV",
      required: true
    },

    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    visitDate: {
      type: Date,
      required: [true, "Please enter visit date"],
    },

    notes: {
      type: String,
      required: [true, "Please enter visit notes"],
    },
  },
  
  {
    timestamps: true,
  }
);

VisitLogSchema.pre('save', async function (next) {
  const doc = this;

  if (doc.isNew && !doc.visitID) {
    try {
      const counter = await Counter.findOneAndUpdate(
        { _id: 'visitID' },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );

      const formattedId = `VL${counter.seq.toString().padStart(3, '0')}`;
      doc.visitID = formattedId;

      next();
    } catch (err) {
      next(err);
    }
  } else {
    next();
  }
});

const VisitLog = mongoose.model("VisitLog", VisitLogSchema);
module.exports = VisitLog;