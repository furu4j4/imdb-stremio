const axios = require('axios');
const cheerio = require('cheerio');

async function getParentsGuide(imdbId, apiKey) {
    const targetUrl = `https://www.imdb.com/title/${imdbId}/parentalguide`;
    // Use HTTPS for ScraperAPI
    const proxyUrl = `https://api.scraperapi.com?api_key=${apiKey}&url=${encodeURIComponent(targetUrl)}`;

    try {
        const response = await axios.get(proxyUrl, { 
            timeout: 15000,
            headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' }
        });
        
        const $ = cheerio.load(response.data);
        const results = [];

        // IMDb redesigned pages use ipc-metadata-list-item for the summary categories
        $('.ipc-metadata-list-item').each((i, el) => {
            const label = $(el).find('.ipc-metadata-list-item__label').text().trim();
            const content = $(el).find('.ipc-metadata-list-item__content-container').text().trim();

            // We look for the 5 main categories
            const validCategories = ["Sex & Nudity", "Violence & Gore", "Profanity", "Alcohol, Drugs & Smoking", "Frightening & Intense Scenes"];
            
            if (validCategories.includes(label)) {
                // Extract severity (Severe, Moderate, Mild, None)
                let severity = "Not Rated";
                if (content.includes('Severe')) severity = "Severe";
                else if (content.includes('Moderate')) severity = "Moderate";
                else if (content.includes('Mild')) severity = "Mild";
                else if (content.includes('None')) severity = "None";

                results.push({ category: label, severity: severity });
            }
        });

        return { error: null, data: results };
    } catch (error) { 
        console.error("Scraper Error:", error.message);
        return { error: "ScraperAPI error or invalid key", data: [] }; 
    }
}

module.exports = { getParentsGuide };
