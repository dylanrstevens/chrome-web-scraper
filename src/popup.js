document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('btn').addEventListener('click', onclick, false)

  function onclick () {
      chrome.tabs.query({active: true, lastFocusedWindow: true}, function (tabs) {
          var url = tabs[0].url
          var title = tabs[0].title
          chrome.runtime.sendMessage({
              msg: url,
              page_title: title
          })
          
      });
  }
}, false);

chrome.runtime.onMessage.addListener(
    function(request) {
        document.getElementById("error_message").innerHTML = request.msg
    }
)