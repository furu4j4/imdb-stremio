const { addonBuilder } = require("stremio-addon-sdk");
const { getParentsGuide } = require("./scraper");
const manifest = require("./manifest");

const builder = new addonBuilder(manifest);

builder.defineStreamHandler(async ({ id }) => {
    const imdbId = id.split(':')[0];
    const { error, data } = await getParentsGuide(imdbId);
    
    if (error) {
        return { 
            streams: [{
                name: "IMDb Guide",
                title: `⚠️ ${error} (Blocked by IMDb)`,
                externalUrl: `https://www.imdb.com/title/${imdbId}/parentalguide`
            }]
        };
    }

    if (data.length === 0) {
        return { 
            streams: [{
                name: "IMDb Guide",
                title: "ℹ️ No advisory data found on page.",
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
