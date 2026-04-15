const express = require('express');
const { getRouter } = require('stremio-addon-sdk');
const path = require('path');
const cors = require('cors');
const addonInterface = require(path.join(__dirname, '..', 'addon.js'));

const app = express();

// Enable CORS for Stremio Web and other clients
app.use(cors());

const router = getRouter(addonInterface);
app.use('/', router);

module.exports = app;
