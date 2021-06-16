const express = require('express');
const router = express.Router();

const chartsOrderController = require('../controllers/ChartsController');
const util = require('../helper/Util');

router.post('/', util.verifyJWT, chartsOrderController.getSixMonthSales);

module.exports = router;
