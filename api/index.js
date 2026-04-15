const express = require('express');
const { getRouter } = require('stremio-addon-sdk');
const path = require('path');
const addonInterface = require(path.join(__dirname, '..', 'addon.js'));

const app = express();

// 1. The Configuration Page (HTML)
app.get('/', (req, res) => {
    res.send(`
        <div style="text-align: center; font-family: sans-serif; padding-top: 50px;">
            <h1>IMDb Parents Guide Configuration</h1>
            <p>Enter your ScraperAPI Key to generate your install link:</p>
            <input type="text" id="key" placeholder="Paste ScraperAPI Key here" style="padding: 10px; width: 300px;">
            <br><br>
            <button onclick="install()">Generate Install Link</button>
            <script>
                function install() {
                    const key = document.getElementById('key').value;
                    if(!key) return alert('Please enter a key');
                    const url = window.location.host + '/' + key + '/manifest.json';
                    window.location.href = 'stremio://' + url;
                }
            </script>
        </div>
    `);
});

// 2. Routing logic to catch the API key from the URL
app.use('/:apiKey', (req, res, next) => {
    const router = getRouter(addonInterface);
    // We attach the apiKey to the request so addon.js can see it
    req.apiKey = req.params.apiKey; 
    router(req, res, next);
});

module.exports = app;
