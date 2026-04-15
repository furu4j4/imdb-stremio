module.exports = {
    id: "org.imdb.parentsguide.scraperapi",
    version: "1.1.3", // Bump the version to force an update
    name: "IMDb Parents Guide",
    description: "IMDb Parental Advisory via ScraperAPI",
    resources: ["stream"],
    types: ["movie", "series"],
    idPrefixes: ["tt"],
    // THIS PART IS CRITICAL
    behaviorHints: {
        configurable: true,
        configurationRequired: true
    },
    config: [
        {
            key: "apiKey",
            type: "text",
            title: "ScraperAPI Key",
            placeholder: "Enter your ScraperAPI key here...",
            required: true
        }
    ]
};
