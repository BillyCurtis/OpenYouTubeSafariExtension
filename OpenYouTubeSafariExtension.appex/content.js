browser.runtime.sendMessage({ greeting: "hello" }).then((response) => {
    console.log("Received response: ", response);
});

browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("Received request: ", request);
});

function afterNavigate() {
    var locationArr = window.location.pathname.split("/").reverse()
    if (locationArr.includes("watch")) {
        window.location.href = `youtube://watch${window.location.search}`
    } else if (locationArr.includes("live")) {
        window.location.href = `youtube://live/${locationArr[0]}`
    } else if (locationArr.includes("shorts")) {
        window.location.href = `youtube://shorts/${locationArr[0]}`
    } else if (locationArr.includes("clip")) {
        window.location.href = `youtube://clip/${locationArr[0]}`
    } else if (locationArr.includes("channel")) {
        window.location.href = `youtube://channel/${locationArr[0]}`
    } else if (locationArr[0] && !locationArr[1]) {
        window.location.href = `youtube://${locationArr[0]}`
    }
}

(document.body || document.documentElement).addEventListener('transitionend',
  function(/*TransitionEvent*/ event) {
    if (event.propertyName === 'width' && event.target.id === 'progress') {
        afterNavigate();
    }
}, true);
// After page load
afterNavigate();
