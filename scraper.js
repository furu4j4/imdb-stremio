const axios = require('axios');
const cheerio = require('cheerio');

async function getParentsGuide(imdbId) {
    const url = `https://www.imdb.com/title/${imdbId}/parentalguide`;
    try {
        const { data } = await axios.get(url, {
            headers: { 
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
                'Accept-Language': 'en-US,en;q=0.9'
            },
            timeout: 8000
        });
        
        const $ = cheerio.load(data);
        const results = [];

        // These IDs match the section anchors on IMDb's Parents Guide page
        const categories = [
            { id: 'advisory-nudity', label: 'Sex & Nudity' },
            { id: 'advisory-violence', label: 'Violence & Gore' },
            { id: 'advisory-profanity', label: 'Profanity' },
            { id: 'advisory-alcohol', label: 'Alcohol & Drugs' },
            { id: 'advisory-frightening', label: 'Frightening' }
        ];

        categories.forEach(cat => {
            const section = $(`section#${cat.id}`);
            
            // This looks for the "Pill" or the status text (Severe, Moderate, Mild)
            // It tries multiple common selectors used by IMDb
            let severity = section.find('.ipl-status-pill, .advisory-severity-pill, [class*="status-pill"]')
                .first()
                .text()
                .trim();

            // Fallback: If the pill selector fails, search for the text directly in the section header
            if (!severity) {
                const headerText = section.find('h4').text().toLowerCase();
                if (headerText.includes('severe')) severity = 'Severe';
                else if (headerText.includes('moderate')) severity = 'Moderate';
                else if (headerText.includes('mild')) severity = 'Mild';
            }
            
            if (severity && severity.toLowerCase() !== "none") {
                results.push({ category: cat.label, severity: severity });
            }
        });

        return results;
    } catch (error) { 
        console.error("Scrape failed:", error.message);
        return []; 
    }
}

module.exports = { getParentsGuide };
