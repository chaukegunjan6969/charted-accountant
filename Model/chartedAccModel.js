const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const chartedAccModel = mongoose.Schema({
  chartedName: {
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
  phoneNumber: {
    type: Number,
    required: true,
    length: 10,
  },
  assignedClients: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
    },
  ],
  assignedEmployee: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
    },
  ],
});

chartedAccModel.methods.matchPassword = async function (enterredPassword) {
  return await bcrypt.compare(enterredPassword, this.password);
};

chartedAccModel.pre("save", async function (next) {
  if (!this.isModified) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const chartedAccSchema = mongoose.model("ChartedAcc", chartedAccModel);

module.exports = chartedAccSchema;
