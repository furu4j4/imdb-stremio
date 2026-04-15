const axios = require('axios');
const cheerio = require('cheerio');

async function getParentsGuide(imdbId) {
    const url = `https://www.imdb.com/title/${imdbId}/parentalguide`;
    try {
        const response = await axios.get(url, {
            headers: { 
                'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Mobile/15E148 Safari/604.1',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.9',
                'Referer': 'https://www.google.com/',
                'DNT': '1',
                'Upgrade-Insecure-Requests': '1'
            },
            timeout: 8000,
            validateStatus: () => true // This allows us to see the error code instead of crashing
        });

        if (response.status !== 200) {
            return { error: `IMDb Error ${response.status}`, data: [] };
        }

        const $ = cheerio.load(response.data);
        const results = [];

        // This selector targets the list rows in your American Beauty screenshot
        $('.ipc-metadata-list-item').each((i, el) => {
            const label = $(el).find('.ipc-metadata-list-item__label').text().trim();
            const severity = $(el).find('.ipc-metadata-list-item__content-container').text().trim();

            if (label && severity && (severity.includes('Severe') || severity.includes('Moderate') || severity.includes('Mild'))) {
                results.push({ category: label, severity: severity });
            }
        });

        return { error: null, data: results };
    } catch (error) { 
        return { error: "Connection Failed", data: [] }; 
    }
}

module.exports = { getParentsGuide };
