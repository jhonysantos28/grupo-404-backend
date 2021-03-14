const express = require('express');
const router = express.Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

var options = {
    explorer: false
};

router.use('/', function (req, res, next) {
    swaggerDocument.host = req.get('host');
    req.swaggerDoc = swaggerDocument;
    next();
}, swaggerUi.serve);
router.get('/', swaggerUi.setup(swaggerDocument, options));

module.exports = router;
