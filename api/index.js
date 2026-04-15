const express = require('express');
const { getRouter } = require('stremio-addon-sdk');
// Using a direct relative path is safer on Vercel than path.join(__dirname)
const addonInterface = require('../addon.js');

const app = express();
const router = getRouter(addonInterface);

// Redirect root to configure page
app.get('/', (req, res) => res.redirect('/configure'));

// Use the SDK router for everything else
app.use('/', router);

module.exports = app;
