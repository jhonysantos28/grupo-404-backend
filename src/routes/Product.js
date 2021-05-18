const express = require('express');
const router = express.Router();
const multer = require('multer');
const util = require('../helper/Util');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/produtos_img')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage });

const productController = require('../controllers/ProductController');

router.get('/', util.verifyJWT, productController.getCollection);
router.post('/', util.verifyJWT, upload.array('photos', 8),productController.insertProduct);
router.get('/:id', util.verifyJWT, productController.getProduct);
router.put('/:id', util.verifyJWT, productController.updateProduct);
router.delete('/:id', util.verifyJWT, productController.deleteProduct);

module.exports = router;
