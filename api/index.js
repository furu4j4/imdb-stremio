const express = require('express');
const { getRouter } = require('stremio-addon-sdk');
const path = require('path');
const addonInterface = require('../addon.js');

const app = express();

// Use the SDK's built-in router
const router = getRouter(addonInterface);

// Handle the root and all sub-paths
app.use('/', router);

// Explicit fallback: if /configure is missed, try to force it
app.get('/', (req, res) => {
    res.redirect('/configure');
});

module.exports = app;
