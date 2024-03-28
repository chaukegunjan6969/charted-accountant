const asyncHandler = require("express-async-handler");

//Importing the Required Models

const ChartedAcc = require("../Model/chartedAccModel");
const Employee = require("../Model/employeeModel");
const Client = require("../Model/clientModel");

const RegisterChartAcc = asyncHandler(async (req, res) => {
  const {
    chartedName,
    email,
    password,
    phoneNumber,
    assignedClients,
    assignedEmployee,
  } = req.body;

  if (!chartedName || !email || !password || !phoneNumber) {
    return res
      .status(400)
      .json({ message: "Please provide all required fields." });
  }

  const userExits = await ChartedAcc.findOne({ email });

  if (userExits) {
    res.status(400);
    throw new Error("User already Exits");
  }

  const chartedaccountant = await ChartedAcc.create({
    chartedName,
    email,
    password,
    phoneNumber,
    assignedEmployee,
    assignedClients,
  });

  if (chartedaccountant) {
    res.status(201).json({
      _id: chartedaccountant._id,
      name: chartedaccountant.chartedName,
      email: chartedName.email,
      employee: chartedaccountant.assignedEmployee,
      clients: chartedaccountant.assignedClients,
    });
  } else {
    res.status(400);
    throw new Error("Failed to create the CA");
  }
});

const RegisterEmployee = asyncHandler(async (req, res) => {
  const {
    employeeName,
    email,
    password,
    phoneNumber,
    assignCharAcc,
    assignedClients,
  } = req.body;

  if (!employeeName || !email || !password || !phoneNumber || !assignCharAcc) {
    return res
      .status(400)
      .json({ message: "please provide all require fields" });
  }

  const userExits = await Employee.findOne({ email });

  if (userExits) {
    res.status(400);
    throw new Error("User already Exits");
  }

  const newemployee = await Employee.create({
    employeeName,
    email,
    password,
    phoneNumber,
    assignCharAcc,
    assignedClients,
  });

  if (newemployee) {
    res.status(201).json({
      _id: newemployee._id,
      name: newemployee.employeeName,
      email: newemployee.email,
      assignCharAcc: newemployee.assignCharAcc,
      clients: newemployee.assignedClients,
    });
  } else {
    res.status(400);
    throw new Error("Failed to create the Employee");
  }
});

const RegisterClient = asyncHandler(async (req, res) => {
  const {
    clientName,
    email,
    password,
    phoneNumber,
    assignCharAcc,
    assignEmployee,
    clientDocuments,
  } = req.body;

  if (!clientName || !email || !password || !phoneNumber ) {
    return res
      .status(400)
      .json({ message: " please provide all required fields" });
  }

  const userExits = await Client.findOne({ email });

  if (userExits) {
    res.status(400);
    throw new Error("User already Exits");
  }

  const newclient = await Client.create({
    clientName,
    email,
    password,
    phoneNumber,
    assignCharAcc,
    assignEmployee,
    clientDocuments,
  });

  if (newclient) {
    res.status(201).json({
      _id: newclient._id,
      name: newclient.clientName,
      email: newclient.email,
      assignCharAcc: newclient.ChartedAcc,
      assignEmployee: newclient.assignEmployee,
      clientDocuments: newclient.clientDocuments,
    });
  } else {
    res.status(400);
    throw new Error("Failed to create the Client");
  }
});

module.exports = { RegisterChartAcc, RegisterEmployee, RegisterClient };
