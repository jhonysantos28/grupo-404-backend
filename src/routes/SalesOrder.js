const express = require('express');
const router = express.Router();

const salesOrderController = require('../controllers/SalesOrderController');
const util = require('../helper/Util');

router.get('/', util.verifyJWT, salesOrderController.getCollection)
router.post('/', util.verifyJWT, salesOrderController.insert);
router.get('/:id', util.verifyJWT, salesOrderController.get);
router.put('/:id', util.verifyJWT, salesOrderController.update);

module.exports = router;
