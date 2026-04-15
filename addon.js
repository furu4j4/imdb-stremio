const { addonBuilder } = require("stremio-addon-sdk");
const { getParentsGuide } = require("./scraper");
const manifest = require("./manifest");

const builder = new addonBuilder(manifest);

builder.defineStreamHandler(async (args) => {
    const imdbId = args.id.split(':')[0];
    
    // Stremio passes the config (API Key) here
    const apiKey = args.config ? args.config.apiKey : null;

    if (!apiKey) {
        return { 
            streams: [{
                name: "IMDb Guide",
                title: "🔑 Please configure the add-on with your ScraperAPI key."
            }]
        };
    }

    const { error, data } = await getParentsGuide(imdbId, apiKey);
    
    if (error) {
        return { 
            streams: [{
                name: "IMDb Guide",
                title: `⚠️ ${error}`,
                externalUrl: `https://www.imdb.com/title/${imdbId}/parentalguide`
            }]
        };
    }

    const streams = data.map(item => {
        let icon = "⚪"; 
        if (item.severity.includes("Severe")) icon = "🔴";
        else if (item.severity.includes("Moderate")) icon = "🟡";
        else if (item.severity.includes("Mild")) icon = "🟢";

        return {
            name: "IMDb Guide",
            title: `${icon} ${item.category}: ${item.severity}`,
            externalUrl: `https://www.imdb.com/title/${imdbId}/parentalguide`
        };
    });

    return { streams };
});

module.exports = builder.getInterface();
