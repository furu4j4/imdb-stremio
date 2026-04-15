const { addonBuilder } = require("stremio-addon-sdk");
const { getParentsGuide } = require("./scraper");
const manifest = require("./manifest");

const builder = new addonBuilder(manifest);

builder.defineStreamHandler(async ({ id }) => {
    const imdbId = id.split(':')[0];
    const guideData = await getParentsGuide(imdbId);
    
    if (guideData.length === 0) {
        // This ensures something shows up even if no severe warnings are found
        return { 
            streams: [{
                name: "IMDb Guide",
                title: "ℹ️ No severe content advisories found.",
                externalUrl: `https://www.imdb.com/title/${imdbId}/parentalguide`
            }]
        };
    }

    const streams = guideData.map(item => ({
        name: "IMDb Guide",
        title: `[${item.severity.toUpperCase()}] ${item.category}`,
        externalUrl: `https://www.imdb.com/title/${imdbId}/parentalguide`
    }));

    return { streams };
});

module.exports = builder.getInterface();
