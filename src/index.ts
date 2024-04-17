
const message = document.createElement("div");
message.innerText = "Loading...";

document.body.appendChild(message);

window.setTimeout(() => message.innerText = "Hello World!", 1000);
