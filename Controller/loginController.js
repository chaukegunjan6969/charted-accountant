const asyncHandler = require("express-async-handler");

const ChartedAcc = require("../Model/chartedAccModel");
const Employee = require("../Model/employeeModel");
const Client = require("../Model/clientModel");

const authChartedAcc = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  let chartedaccountant = await ChartedAcc.findOne({ email });

  if (chartedaccountant && (await chartedaccountant.matchPassword(password))) {
    res.json({
      _id: chartedaccountant._id,
      name: chartedaccountant.chartedName,
      email: chartedaccountant.email,
    });
  } else {
    res.status(400);
    throw new Error("Please Sign-Up or check email correctly");
  }
});

const authEmployee = asyncHandler(async (req,res)=>{
    const {email, password} = req.body;

    let employee = await Employee.findOne({email});
    
    if(employee && (await employee.matchPassword(password)))
    {
        res.json({
          _id : employee._id,
          name: employee.employeeName,
          phone: employee.phoneNumber,
          email : employee.email
        })
    }
    else
    {
        throw new Error("please signUp or Check email correctly");
    }
})

const authClient = asyncHandler(async (req,res)=>{
    const {email, password} = req.body;

    let client = await Client.findOne({email});
    
    if(client && (await client.matchPassword(password)))
    {
        res.json({
          _id : client._id,
          name: client.clientName,
          phone: client.phoneNumber,
          email : client.email
        })
    }
    else
    {
        throw new Error("please signUp or Check email correctly");
    }
})

module.exports = {authChartedAcc,authEmployee,authClient};
