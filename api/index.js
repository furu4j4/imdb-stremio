const express = require('express');
const { getRouter } = require('stremio-addon-sdk');
const path = require('path');
const cors = require('cors');
const addonInterface = require('../addon.js');

const app = express();
app.use(cors()); // Helps Stremio talk to your server

const router = getRouter(addonInterface);

// Use the SDK router for all paths
app.use('/', router);

// If someone hits the root "/", send them to the config page instead of a 404
app.get('/', (req, res) => {
    res.redirect('/configure');
});

module.exports = app;
