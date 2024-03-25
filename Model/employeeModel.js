// name email phone Ca [clients] password

const mongoose = require("mongoose");

const employeeModel = mongoose.Schema({
  employeeName: {
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

  assignCharAcc: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ChartedAcc",
    required: true,
  },

  assignedClients: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref:"Client"
    },
  ],
});

const employeeSchema = mongoose.model("Employee", employeeModel);

module.exports = employeeSchema
