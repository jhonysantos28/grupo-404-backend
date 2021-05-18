const express = require('express');
const router = express.Router();

const chartsOrderController = require('../controllers/ChartsController');
const util = require('../helper/Util');

router.get('/', util.verifyJWT, chartsOrderController.getSixMonthSales);

module.exports = router;
