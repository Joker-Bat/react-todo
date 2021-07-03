const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Must have a name"],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

// Only give a active user List
userSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
