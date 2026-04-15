module.exports = {
    id: "org.imdb.parentsguide.scraperapi",
    version: "1.1.2",
    name: "IMDb Parents Guide",
    description: "IMDb Parental Advisory via ScraperAPI",
    resources: ["stream"],
    types: ["movie", "series"],
    idPrefixes: ["tt"],
    catalogs: [],
    logo: "https://www.imdb.com/favicon.ico",
    // THIS SECTION IS REQUIRED FOR THE KEY PROMPT TO SHOW UP
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
