const express = require('express');
const router = express.Router();

const userController = require('../controllers/UserController');
const userAddressController = require('../controllers/AddressController');
const salesOrderController = require('../controllers/SalesOrderController');

//Routers to user
router.get('/', userController.getCollection)
router.post('/', userController.insertUser);
router.post('/login', userController.login);
router.get('/:id', userController.getUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

//Router to user Address
router.post('/address', userAddressController.insert);
router.put('/address/:id', userAddressController.update);
router.delete('/address/:id', userAddressController.delete);

//Router to user Orders
router.get('/:id/orders', salesOrderController.getUserOrders);

module.exports = router;
