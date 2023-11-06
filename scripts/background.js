
function handleMessage(request, sender, sendResponse) {
    chrome.downloads.download({url: "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png", filename: "temp.png"});
    let url = request.url
    let all = url.split("/")
    let name = all[all.length - 2]
    let filename = name +".zip"
    console.log(`content script sent a message: ${request.url}`);
    console.log(`filename: ${filename}`);
    let myPromise = chrome.downloads.download({url: request.url, filename: filename })
    myPromise.then(
        function(value) {console.log(value)},
        function(error) {console.log(error)}
    );
    return Promise.resolve({ response: "response from background script" });
}

chrome.runtime.onMessage.addListener(handleMessage);