const express = require('express');
const { getRouter } = require('stremio-addon-sdk');
const addonInterface = require('../addon.js'); // Simplified path for Vercel

const app = express();

// The SDK's getRouter handles /configure and /manifest.json automatically
const router = getRouter(addonInterface);

app.use('/', router);

// Explicitly handle the root redirect
app.get('/', (req, res) => {
    res.redirect('/configure');
});

module.exports = app;
