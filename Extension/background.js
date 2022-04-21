let color = "#3aa757";

let optionsData = null;

chrome.action.onClicked.addListener((tab) => {
  console.log(tab.url);
});

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color });
  console.log("Default background color set to %cgreen", `color: ${color}`);
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "getOptionsData") {
    sendResponse(optionsData);
  } else if (request.action === "setOptionsData") {
    optionsData = request.data;
  }
});
