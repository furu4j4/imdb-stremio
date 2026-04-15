const { addonBuilder } = require("stremio-addon-sdk");
const { getParentsGuide } = require("./scraper");
const manifest = require("./manifest");

const builder = new addonBuilder(manifest);

builder.defineStreamHandler(async (args) => {
    const imdbId = args.id.split(':')[0];
    const apiKey = args.config ? args.config.apiKey : null;
    const guideUrl = `https://www.imdb.com/title/${imdbId}/parentalguide`;

    if (!apiKey) {
        return { 
            streams: [{
                name: "IMDb Guide",
                title: "🔑 Open addon settings to enter ScraperAPI Key",
                externalUrl: guideUrl
            }]
        };
    }

    try {
        const { error, data } = await getParentsGuide(imdbId, apiKey);
        
        if (error || !data || data.length === 0) {
            return { 
                streams: [{
                    name: "IMDb Guide",
                    title: `⚠️ ${error || "No data available"}`,
                    externalUrl: guideUrl
                }]
            };
        }

        const streams = data.map(item => {
            let icon = "⚪"; 
            if (item.severity === "Severe") icon = "🔴";
            else if (item.severity === "Moderate") icon = "🟡";
            else if (item.severity === "Mild") icon = "🟢";
            else if (item.severity === "None") icon = "🔵";

            return {
                name: "IMDb Guide",
                title: `${icon} ${item.category}: ${item.severity}`,
                externalUrl: guideUrl
            };
        });

        return { streams };
    } catch (e) {
        return { 
            streams: [{
                name: "IMDb Guide",
                title: "❌ Connection Error",
                externalUrl: guideUrl
            }]
        };
    }
});

module.exports = builder.getInterface();
