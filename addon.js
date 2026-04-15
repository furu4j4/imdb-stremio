const { addonBuilder } = require("stremio-addon-sdk");
const { getParentsGuide } = require("./scraper");
const manifest = require("./manifest");

const builder = new addonBuilder(manifest);

builder.defineStreamHandler(async ({ id }) => {
    const imdbId = id.split(':')[0];
    const guideData = await getParentsGuide(imdbId);
    
    // If the scraper found nothing, show a clear error message for debugging
    if (guideData.length === 0) {
        return { 
            streams: [{
                name: "IMDb Guide",
                title: "⚠️ Could not pull data. Click to open IMDb.",
                externalUrl: `https://www.imdb.com/title/${imdbId}/parentalguide`
            }]
        };
    }

    // Sort so Severe is always at the top
    const sortedData = guideData.sort((a, b) => {
        const order = { "Severe": 1, "Moderate": 2, "Mild": 3 };
        return (order[a.severity] || 9) - (order[b.severity] || 9);
    });

    const streams = sortedData.map(item => {
        let icon = "⚪"; 
        if (item.severity === "Severe") icon = "🔴";
        else if (item.severity === "Moderate") icon = "🟡";
        else if (item.severity === "Mild") icon = "🟢";

        return {
            name: "IMDb Guide",
            title: `${icon} ${item.category}: ${item.severity}`,
            externalUrl: `https://www.imdb.com/title/${imdbId}/parentalguide`
        };
    });

    return { streams };
});

module.exports = builder.getInterface();
