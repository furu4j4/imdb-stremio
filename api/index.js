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
        const key = document.getElementById('key').value.trim();
        if(!key) return alert('Please enter your ScraperAPI key!');

        // 1. Create the configuration string
        const configPath = 'apiKey=' + encodeURIComponent(key);

        // 2. Build the full manifest URL
        // It should look like: https://your-app.vercel.app/apiKey=123/manifest.json
        const manifestUrl = window.location.origin + '/' + configPath + '/manifest.json';

        // 3. Convert to Stremio protocol
        // It should look like: stremio://your-app.vercel.app/apiKey=123/manifest.json
        const stremioLink = manifestUrl.replace('https://', 'stremio://').replace('http://', 'stremio://');

        console.log("Installing from:", stremioLink);
        window.location.href = stremioLink;
    }
</script>
        </body>
    `);
});

// 2. Use the SDK for the internal Stremio logic (manifest/streams)
const sdkRouter = getRouter(addonInterface);
app.use('/', sdkRouter);

module.exports = app;
