const URL = "https://short-terms.loca.lt";

let query = null;

var slider = document.getElementById("length");
var output = document.getElementById("demo");
output.innerHTML = slider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function () {
  output.innerHTML = this.value;
};

document.getElementById("re-summarize").addEventListener("click", () => {
  clearDetails();
  summarize();
});

chrome.runtime.sendMessage({ action: "getOptionsData" }, (response) => {
  query = response;
  summarize();
});

function summarize() {
  if (query.type === "fromText") {
    summarizeFromText(query.text);
  } else if (query.type === "fromURL") {
    summarizeFromUrl(query.url);
  }
}

async function summarizeFromText(text) {
  const length = document.getElementById("length").value;

  const response = await fetch(`${URL}/summarize`, {
    method: "POST",
    body: JSON.stringify({
      text: text.replaceAll("\n", "\\n"),
      length: length,
    }),
    mode: "cors",
    headers: {
      "Content-type": "application/json",
    },
  });

  const data = await response.json();
  addText("Summary", data.summary);
}

async function summarizeFromUrl(url) {
  const length = document.getElementById("length").value;

  const response = await fetch(`${URL}/summarize_url`, {
    method: "POST",
    body: JSON.stringify({
      url: url,
      length: length,
    }),
    mode: "cors",
    headers: {
      "Content-type": "application/json",
    },
  });

  const data = await response.json();
  for (let i = 0; i < data.length; i++) {
    addText(data[i].title, data[i].summary);
  }
}

function addText(title, text) {
  const details = document.getElementsByClassName("details")[0];
  const titleElement = document.createElement("h3");
  titleElement.appendChild(document.createTextNode(title));
  details.appendChild(titleElement);
  details.appendChild(document.createTextNode(text));
  details.appendChild(document.createElement("br"));
  details.appendChild(document.createElement("br"));
}

function clearDetails() {
  const details = document.getElementsByClassName("details")[0];
  while (details.firstChild) {
    details.removeChild(details.firstChild);
  }
}
