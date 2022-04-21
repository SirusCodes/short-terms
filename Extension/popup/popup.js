// document.addEventListener("DOMContentLoaded", async () => {
//   const list = document.getElementById("list");
//   const url = "https://v2.jokeapi.dev/joke/Any";

//   try {
//     const res = await fetch(url);
//     const data = await res.json();
//     const joke = data.setup + " " + " " + data.delivery;
//     const jokeElement = document.createElement("li");
//     jokeElement.innerText = joke;
//     list.appendChild(jokeElement);
//   } catch (err) {
//     console.error(err);
//   }
// });
document.getElementById("form").addEventListener("submit", (e) => {
    e.preventDefault();

    const content = document.getElementById("content");
    const length = document.getElementById("length").value;

    fetch("https://lqb1ye.deta.dev/summarize", {
            method: "POST",
            body: JSON.stringify({
                text: content.value.replaceAll("\n", "\\n"),
                length: length,
            }),
            // credentials: "include",
            mode: "cors",
            headers: {
                "Content-type": "application/json",
            },
        })
        .then((res) => res.json())
        .then((res) => {
            document.getElementById("response").innerText = res.summary;
        })
        .catch((res) => {
            document.getElementById("response").innerText = JSON.stringify(res);
        });
});