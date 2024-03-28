// name email phone CA employee  password  properties

const mongoose = require("mongoose");
const bcrypt = require("bcrypt")

const clientModel = mongoose.Schema({
  clientName: {
    type: String,
    required: true,
    trim: true,
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
    required:true
  },

  assignEmployee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required:true
  },

  clientDocuments: [
    {
      documentName: {
        type: String,
      },
      documentUrl: {
        type: String,
      },
      documentMonth: {
        type: String,
      },
      documentYear: {
        type: Number,
        length: 4,
      },
    },
  ],
});

clientModel.methods.matchPassword = async function(enterredPassword){
  return await bcrypt.compare(enterredPassword, this.password); 
}

clientModel.pre("save", async function (next){
  if(!this.isModified){
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
})

const clientSchema = mongoose.model("Client", clientModel);

module.exports = clientSchema;
