const express = require("express");


const {RegisterChartAcc,RegisterEmployee,RegisterClient } = require('../Controller/registerControllers');

const router = express.Router();


router.route("/registerChartedAccount").post(RegisterChartAcc);
router.route("/registerEmployee").post(RegisterEmployee);
router.route("/registerClient").post(RegisterClient);



module.exports =  router