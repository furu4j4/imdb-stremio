const express = require('express');
const { getRouter } = require('stremio-addon-sdk');
const path = require('path');
const addonInterface = require(path.join(__dirname, '..', 'addon.js'));

const app = express();
const router = getRouter(addonInterface);

app.use('/', router);

module.exports = app;
