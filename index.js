const got = require('got');
const cheerio = require('cheerio');
const fs = require('fs');

const extractLinks = async (url) => {
    try {
        const response = await got(url);
        const html = response.body;

        const $ = cheerio.load(html, response);

        const linkObjects = $('a');
    
        let links = [];
        linkObjects.each(async (index, element) => {
            links.push({
                link: url + $(element).attr('href'),
                statusCode: response.statusCode 
            });
        });
        console.log(links);
        console.log(links.length);
        await fs.writeFileSync('links.json', JSON.stringify(links, null, 2));
    } catch (error) {
        console.log(error.response.body);
    }
};

const URL = 'https://www.upwork.com/';
extractLinks(URL);