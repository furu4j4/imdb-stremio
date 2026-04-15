const axios = require('axios');
const cheerio = require('cheerio');

async function getParentsGuide(imdbId, apiKey) {
    const targetUrl = `https://www.imdb.com/title/${imdbId}/parentalguide`;
    const proxyUrl = `http://api.scraperapi.com?api_key=${apiKey}&url=${encodeURIComponent(targetUrl)}`;

    try {
        const response = await axios.get(proxyUrl, { timeout: 15000 });
        const $ = cheerio.load(response.data);
        const results = [];

        $('.ipc-metadata-list-item').each((i, el) => {
            const label = $(el).find('.ipc-metadata-list-item__label').text().trim();
            const severity = $(el).find('.ipc-metadata-list-item__content-container').text().trim();

            if (label && severity && (severity.includes('Severe') || severity.includes('Moderate') || severity.includes('Mild'))) {
                results.push({ category: label, severity: severity });
            }
        });

        return { error: null, data: results };
    } catch (error) { 
        return { error: "ScraperAPI error or invalid key", data: [] }; 
    }
}

module.exports = { getParentsGuide };
