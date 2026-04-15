module.exports = {
    id: "org.imdb.parentsguide.scraperapi",
    version: "1.1.0",
    name: "IMDb Parents Guide (ScraperAPI)",
    description: "IMDb Parental Advisory via ScraperAPI",
    resources: ["stream"],
    types: ["movie", "series"],
    idPrefixes: ["tt"],
    catalogs: [],
    // This tells Stremio to look for a key in the URL
    config: [
        {
            key: "apiKey",
            type: "text",
            title: "ScraperAPI Key",
            required: true
        }
    ]
};
