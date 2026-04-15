module.exports = {
    id: "org.imdb.parentsguide.scraperapi",
    version: "1.1.7", // Bump version to force Vercel to refresh
    name: "IMDb Parents Guide",
    description: "IMDb Parental Advisory via ScraperAPI",
    resources: ["stream"],
    types: ["movie", "series"],
    idPrefixes: ["tt"],
    catalogs: [], 
    logo: "https://www.imdb.com/favicon.ico",
    // YOU MUST ADD THIS SECTION
    behaviorHints: {
        configurable: true,
        configurationRequired: true
    },
    config: [
        {
            key: "apiKey",
            type: "text",
            title: "ScraperAPI Key",
            placeholder: "Enter your ScraperAPI key...",
            required: true
        }
    ]
};
