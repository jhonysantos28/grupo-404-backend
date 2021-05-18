const express = require('express');
const router = express.Router();

const userController = require('../controllers/UserController');
const userAddressController = require('../controllers/AddressController');
const salesOrderController = require('../controllers/SalesOrderController');
const util = require('../helper/Util');

//Routers to user
router.get('/', util.verifyJWT, userController.getCollection)
router.post('/', util.verifyJWT, userController.insertUser);
router.post('/login', userController.login);
router.get('/:id', util.verifyJWT, userController.getUser);
router.put('/:id', util.verifyJWT, userController.updateUser);
router.delete('/:id', util.verifyJWT, userController.deleteUser);

//Router to user Address
router.post('/address', util.verifyJWT, userAddressController.insert);
router.put('/address/:id', util.verifyJWT, userAddressController.update);
router.delete('/address/:id', util.verifyJWT, userAddressController.delete);

//Router to user Orders
router.get('/:id/orders', util.verifyJWT, salesOrderController.getUserOrders);

module.exports = router;
