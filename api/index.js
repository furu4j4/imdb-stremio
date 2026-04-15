const express = require('express');
const { getRouter } = require('stremio-addon-sdk');
const path = require('path');
const cors = require('cors');
const addonInterface = require('../addon.js');

const app = express();
app.use(cors()); 

const router = getRouter(addonInterface);

// Root path redirect to configuration
app.get('/', (req, res) => res.redirect('/configure'));

// Use the SDK router
app.use('/', router);

module.exports = app;
