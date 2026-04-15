const axios = require('axios');
const cheerio = require('cheerio');

async function getParentsGuide(imdbId) {
    const url = `https://www.imdb.com/title/${imdbId}/parentalguide`;
    try {
        const response = await axios.get(url, {
            headers: { 
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.9',
                'Accept-Encoding': 'gzip, deflate, br',
                'Cache-Control': 'no-cache',
                'Pragma': 'no-cache',
                'Referer': 'https://www.google.com/'
            },
            timeout: 10000
        });

        // If IMDb returns something other than 200, it's a block
        if (response.status !== 200) return [];

        const $ = cheerio.load(response.data);
        const results = [];

        // This matches the exact table rows from the image you sent
        $('.ipc-metadata-list-item--metadata').each((i, el) => {
            const label = $(el).find('.ipc-metadata-list-item__label').text().trim();
            const severity = $(el).find('.ipc-metadata-list-item__content-container').text().trim();

            if (label && severity) {
                // Ensure we only grab valid categories
                const validCategories = ["Sex & Nudity", "Violence & Gore", "Profanity", "Alcohol, Drugs & Smoking", "Frightening & Intense Scenes"];
                if (validCategories.some(cat => label.includes(cat))) {
                    results.push({ category: label, severity: severity });
                }
            }
        });

        return results;
    } catch (error) { 
        console.error("Scrape Error:", error.response ? error.response.status : error.message);
        return []; 
    }
}

module.exports = { getParentsGuide };
