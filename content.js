import fetch from "node-fetch";
import * as cheerio from 'cheerio';


chrome.runtime.onMessage.addListener(
    function (request) {

        const URL = request.msg

        const getRawData = (URL) => {
            return fetch(URL).then((response) => response.text()).then((data) => {
                return data;
            });
        }

        const start = async (url) => {
            const data = await getRawData(url);
            //console.log(data);
            const parsedData = cheerio.load(data);
            console.log(parsedData("p").text());
        }

        start(URL);
});
