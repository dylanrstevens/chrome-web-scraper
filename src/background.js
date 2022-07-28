'use strict';

import * as cheerio from 'cheerio';



chrome.runtime.onMessage.addListener(
    function (request) {

        const ThisURL = request.msg
        const ThisTitle = request.page_title

        const getRawData = (ThisURL) => {
            return fetch(ThisURL).then((response) => response.text()).then((data) => {
                return data;
            });
        }

        const start = async (url) => {
            const data = await getRawData(url);
            //console.log(data);
            const parsedData = cheerio.load(data);
            const parsed_text = parsedData("p").text()
            //console.log(parsed_text);
            const fn = "PLAIN_TEXT.txt"
            //console.log(fn)
            var dataUri = "data:text/plain;base64," + btoa(unescape(encodeURIComponent(parsed_text)))
            //console.log(dataUri)
            chrome.downloads.download({
              url: dataUri,
              filename: fn,
              saveAs: false
            })
        }

        start(ThisURL);
});
