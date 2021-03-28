const express = require('express');
const router = express.Router();

const productController = require('../controllers/ProductController');

router.get('/', productController.getCollection)
router.post('/', productController.insertProduct);
router.get('/:id', productController.getProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;
