module.exports = {
    id: "org.imdb.parentsguide.scraperapi",
    version: "1.1.4",
    name: "IMDb Parents Guide",
    description: "IMDb Parental Advisory via ScraperAPI",
    resources: ["stream"],
    types: ["movie", "series"],
    idPrefixes: ["tt"],
    catalogs: [], // Ensure this remains an empty array
    logo: "https://www.imdb.com/favicon.ico",
    // ADD THESE TWO LINES TO FIX THE 404/MISSING PROMPT
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
