const express   = require('express');
const router    = express.Router();
const system    = require('../controllers/SystemController');

router.get('/', system.healthcheck);

module.exports = router;