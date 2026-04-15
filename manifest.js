module.exports = {
    id: "org.imdb.parentsguide.scraperapi",
    version: "1.2.0",
    name: "IMDb Parents Guide",
    description: "IMDb Parental Advisory via ScraperAPI",
    resources: ["stream"],
    types: ["movie", "series"],
    idPrefixes: ["tt"],
    catalogs: [],
    behaviorHints: {
        configurable: true,
        configurationRequired: true
    }
};
