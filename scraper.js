const axios = require('axios');
const cheerio = require('cheerio');

async function getParentsGuide(imdbId) {
    const url = `https://www.imdb.com/title/${imdbId}/parentalguide`;
    try {
        const { data } = await axios.get(url, {
            headers: { 
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                'Accept-Language': 'en-US,en;q=0.9'
            },
            timeout: 5000
        });
        const $ = cheerio.load(data);
        const results = [];
        const categories = [
            { id: 'advisory-nudity', label: 'Sex & Nudity' },
            { id: 'advisory-violence', label: 'Violence & Gore' },
            { id: 'advisory-profanity', label: 'Profanity' },
            { id: 'advisory-alcohol', label: 'Alcohol & Drugs' },
            { id: 'advisory-frightening', label: 'Frightening' }
        ];

        categories.forEach(cat => {
            const section = $(`section#${cat.id}`);
            const severity = section.find('.ipl-status-pill').first().text().trim();
            if (severity && severity.toLowerCase() !== "none") {
                results.push({ category: cat.label, severity: severity });
            }
        });
        return results;
    } catch (error) { 
        return []; 
    }
}

module.exports = { getParentsGuide };
