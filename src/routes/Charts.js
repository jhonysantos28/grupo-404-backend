const express = require('express');
const router = express.Router();

const chartsOrderController = require('../controllers/ChartsController');

router.get('/', chartsOrderController.getSixMonthSales);

module.exports = router;
