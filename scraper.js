const axios = require('axios');
const cheerio = require('cheerio');

async function getParentsGuide(imdbId) {
    const url = `https://www.imdb.com/title/${imdbId}/parentalguide`;
    try {
        const { data } = await axios.get(url, {
            headers: { 
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept-Language': 'en-US,en;q=0.9'
            },
            timeout: 10000
        });
        
        const $ = cheerio.load(data);
        const results = [];

        // Categories we are looking for
        const targets = [
            "Sex & Nudity",
            "Violence & Gore",
            "Profanity",
            "Alcohol, Drugs & Smoking",
            "Frightening & Intense Scenes"
        ];

        // We search every list item and section for the text
        $('li, section, div[class*="metadata-list-item"]').each((i, el) => {
            const rowText = $(el).text();
            
            targets.forEach(category => {
                if (rowText.includes(category)) {
                    // Look for the severity keywords in the same block of text
                    let severity = "None";
                    if (rowText.includes("Severe")) severity = "Severe";
                    else if (rowText.includes("Moderate")) severity = "Moderate";
                    else if (rowText.includes("Mild")) severity = "Mild";

                    // Prevent duplicates
                    if (severity !== "None" && !results.some(r => r.category === category)) {
                        results.push({ category, severity });
                    }
                }
            });
        });

        return results;
    } catch (error) { 
        return []; 
    }
}

module.exports = { getParentsGuide };
