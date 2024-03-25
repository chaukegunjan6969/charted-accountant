const mongoose = require("mongoose");

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

const chartedAccSchema = mongoose.model("ChartedAcc", chartedAccModel);

module.exports = chartedAccSchema;
