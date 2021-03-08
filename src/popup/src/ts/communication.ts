function goToUrl(url: string, close?: true) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tab) => {
    console.log(tab[0]);

    chrome.tabs.sendMessage(tab[0].id, { text: "goto", url });
    if (close) {
      window.close();
    }
  });
}
let changed = false;
function connect() {
  console.log("Connect to Runtime");
  if (changed) return;
  changed = true;
  chrome.runtime.connect();
}
export { goToUrl, connect };
