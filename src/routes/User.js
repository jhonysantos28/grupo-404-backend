const express = require('express');
const router = express.Router();

const userController = require('../controllers/UserController');
const userAddressController = require('../controllers/AddressController');

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

module.exports = router;
