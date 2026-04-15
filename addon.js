const { addonBuilder } = require("stremio-addon-sdk");
const { getParentsGuide } = require("./scraper");
const manifest = require("./manifest");

const builder = new addonBuilder(manifest);

builder.defineStreamHandler(async ({ id }) => {
    const imdbId = id.split(':')[0];
    const guideData = await getParentsGuide(imdbId);
    
    if (guideData.length === 0) {
        return { streams: [] }; // Don't show anything if scrape fails
    }

    const streams = guideData.map(item => {
        // Add visual color indicators based on the text
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
