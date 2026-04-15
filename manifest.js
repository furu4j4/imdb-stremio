module.exports = {
    id: "org.imdb.parentsguide.scraperapi",
    version: "1.1.5", // Increased version to force update
    name: "IMDb Parents Guide",
    description: "IMDb Parental Advisory via ScraperAPI",
    resources: ["stream"],
    types: ["movie", "series"],
    idPrefixes: ["tt"],
    catalogs: [], // Keep as empty array
    logo: "https://www.imdb.com/favicon.ico",
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
