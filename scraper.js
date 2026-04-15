const axios = require('axios');
const cheerio = require('cheerio');

async function getParentsGuide(imdbId) {
    const url = `https://www.imdb.com/title/${imdbId}/parentalguide`;
    try {
        const { data } = await axios.get(url, {
            headers: { 
                'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
                'Accept-Language': 'en-US,en;q=0.9'
            },
            timeout: 10000
        });
        
        const $ = cheerio.load(data);
        const results = [];

        // Targets the new list items seen in your screenshot
        $('.ipc-metadata-list-item--metadata').each((i, el) => {
            const label = $(el).find('.ipc-metadata-list-item__label').text().trim();
            const severity = $(el).find('.ipc-metadata-list-item__content-container').text().trim();

            // We only want the rows that actually have a severity rating
            if (label && severity && (
                severity.includes('Severe') || 
                severity.includes('Moderate') || 
                severity.includes('Mild') || 
                severity.includes('None')
            )) {
                results.push({
                    category: label,
                    severity: severity
                });
            }
        });

        return results;
    } catch (error) { 
        console.error("Scrape failed:", error.message);
        return []; 
    }
}

module.exports = { getParentsGuide };
