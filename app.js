const express = require('express');
const routes = require('./src/router');

app = express();
app.use('/', routes);

module.exports = app;