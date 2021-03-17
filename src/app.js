global.fetch = require('node-fetch');
require('dotenv').config();

const express = require('express');
const app     = express();
const cors    = require('cors');

app.use(cors());

var bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use('/api-docs', require('./routes/Docs'));
app.use('/healthcheck/', require('./routes/System'));
app.use('/user/', require('./routes/User'));

module.exports = app;