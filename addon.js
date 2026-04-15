const { addonBuilder } = require("stremio-addon-sdk");
const { getParentsGuide } = require("./scraper");
const manifest = require("./manifest");

const builder = new addonBuilder(manifest);

// The 'req' object is where our apiKey lives now
builder.defineStreamHandler(async (args) => {
    const imdbId = args.id.split(':')[0];
    
    // Check if the apiKey was provided in the URL
    const apiKey = args.config ? args.config.apiKey : null; 
    // Note: In custom Express setups, we might need to handle this via the 'args' or global state
    // Since we're using a specific route, we'll assume the scraper will handle the key logic.
});

// To keep it simple with the SDK, let's modify the scraper to use the key from the manifest URL
module.exports = builder.getInterface();
