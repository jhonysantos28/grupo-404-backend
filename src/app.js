global.fetch = require('node-fetch');
require('dotenv').config();

const express = require('express');
const app     = express();
const cors    = require('cors');

app.use(cors());

// Rota publica para imagens carregadas
app.use(express.static('uploads'));

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api-docs', require('./routes/Docs'));
app.use('/healthcheck/', require('./routes/System'));
app.use('/user/', require('./routes/User'));
app.use('/product/', require('./routes/Product'));
app.use('/order/', require('./routes/SalesOrder'));
app.use('/chart/', require('./routes/Charts'));

module.exports = app;