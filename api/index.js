const express = require('express');
const { getRouter } = require('stremio-addon-sdk');
const addonInterface = require('../addon.js');

const app = express();

// 1. MANUALLY handle the redirect and the configure page
app.get('/', (req, res) => res.redirect('/configure'));

app.get('/configure', (req, res) => {
    // We send a tiny bit of HTML to make sure the page ACTUALLY exists
    res.setHeader('Content-Type', 'text/html');
    res.send(`
        <body style="background:#111;color:#fff;font-family:sans-serif;display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;">
            <h1>IMDb Parents Guide Setup</h1>
            <p>Enter your ScraperAPI Key:</p>
            <input type="text" id="key" style="padding:10px;width:300px;" placeholder="Key here...">
            <button onclick="install()" style="padding:10px 20px;margin-top:10px;cursor:pointer;">Install Addon</button>
            <script>
                function install() {
                    const key = document.getElementById('key').value;
                    if(!key) return alert('Enter a key!');
                    const manifestUrl = window.location.origin + '/' + encodeURIComponent(JSON.stringify({apiKey: key})) + '/manifest.json';
                    window.location.href = 'stremio://' + manifestUrl.replace('https://', '').replace('http://', '');
                }
            </script>
        </body>
    `);
});

// 2. Use the SDK for the internal Stremio logic (manifest/streams)
const sdkRouter = getRouter(addonInterface);
app.use('/', sdkRouter);

module.exports = app;
