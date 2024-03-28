const express = require("express")

const {authChartedAcc, authClient, authEmployee} = require("../Controller/loginController")


const router = express.Router();

router.route("/login-chartedAccountant").post(authChartedAcc);
router.route("/login-Employee").post(authEmployee);
router.route("/login-client").post(authClient);
module.exports =  router