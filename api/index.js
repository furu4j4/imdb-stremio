const express = require('express');
const { getRouter } = require('stremio-addon-sdk');
const cors = require('cors');
const path = require('path');
const addonInterface = require('../addon.js');

const app = express();

// Use standard CORS package for better compatibility
app.use(cors());

const router = getRouter(addonInterface);

// This serves the manifest and the configuration landing page
app.use('/', router);

module.exports = app;
