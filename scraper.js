const axios = require('axios');
const cheerio = require('cheerio');

async function getParentsGuide(imdbId) {
    // Using the 'm.' subdomain sometimes bypasses datacenter filters
    const url = `https://m.imdb.com/title/${imdbId}/parentalguide`;
    try {
        const response = await axios.get(url, {
            headers: { 
                // We use a VERY specific mobile user agent
                'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_4_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4.1 Mobile/15E148 Safari/604.1',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.5',
                'Referer': 'https://www.google.com/',
                'Sec-Fetch-Dest': 'document',
                'Sec-Fetch-Mode': 'navigate',
                'Sec-Fetch-Site': 'cross-site'
            },
            timeout: 10000
        });

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
        return { error: "IMDb Blocked Connection", data: [] }; 
    }
}

module.exports = { getParentsGuide };
