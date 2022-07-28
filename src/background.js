'use strict';

import {convert} from 'html-to-text';


const sendHtml = (message) => {
    chrome.runtime.sendMessage(
        {
            msg: message
        }
    )
}

chrome.runtime.onMessage.addListener(
    function (request) {

        const ThisURL = request.msg
        const ThisTitle = request.page_title.replace(/[&\/\\#,+()$~%.'":*?<>{} |]/g, "-")
        
        const getRawData = (ThisURL) => {
            return fetch(ThisURL).then((response) => response.text()).then((data) => {
                sendHtml("")
                return data;
            })
        }

        const start = async (url) => {
            const data = await getRawData(url);
            var parsed_text = convert(data, {wordwrap: 130})
            const fn = "PLAIN_TEXT-"+ThisTitle+".txt"
            var dataUri = "data:text/plain;base64," + btoa(unescape(encodeURIComponent(parsed_text)))
            chrome.downloads.download({
              url: dataUri,
              filename: fn,
              saveAs: false
            })
        }
        
        start(ThisURL).catch((err) => {
            sendHtml("Error! Looks like you're trying to scrape an address restricted by chrome. Please try a different website.")
        })
});
