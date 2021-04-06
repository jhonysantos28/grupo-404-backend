const express = require('express');
const router = express.Router();

const salesOrderController = require('../controllers/SalesOrderController');

router.get('/', salesOrderController.getCollection)
router.post('/', salesOrderController.insert);
router.get('/:id', salesOrderController.get);
router.put('/:id', salesOrderController.update);

module.exports = router;
