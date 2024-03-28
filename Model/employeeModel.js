// name email phone Ca [clients] password

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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
      ref: "Client",
    },
  ],
});

employeeModel.methods.matchPassword = async function (enterredPassword) {
  return await bcrypt.compare(enterredPassword, this.password);
};

employeeModel.pre("save", async function (next) {
  if (!this.isModified) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const employeeSchema = mongoose.model("Employee", employeeModel);

module.exports = employeeSchema;
