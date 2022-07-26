document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('btn').addEventListener('click', onclick, false)

    function onclick () {
        chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
            var url = tabs[0].url;
            chrome.tabs.sendMessage(tabs[0].id, url)
            
        });
    }
}, false)