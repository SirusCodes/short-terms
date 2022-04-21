document.getElementById("form").addEventListener("submit", (e) => {
  const content = document.getElementById("content");

  chrome.tabs.create({ url: "summary/summary.html" });
  chrome.runtime.sendMessage({
    action: "setOptionsData",
    data: {
      type: "fromText",
      text: content.value.replaceAll("\n", "\\n"),
    },
  });
});

document.getElementById("summarize-page").addEventListener("click", (e) => {
  chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    const currentPage = tabs[0].url;
    chrome.tabs.create({ url: "summary/summary.html" });
    chrome.runtime.sendMessage({
      action: "setOptionsData",
      data: {
        type: "fromURL",
        url: currentPage,
      },
    });
  });
});
