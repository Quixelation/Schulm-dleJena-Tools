import { localStorage, storage, syncStorage } from "../../types";
chrome.runtime.onInstalled.addListener(
  (object: chrome.runtime.InstalledDetails): void => {
    if ("install" === object.reason)
      chrome.tabs.create(
        { url: "https://smjt.robertstuendl.com/first-install" },
        (): void => {
          console.log("New tab launched");
        },
      );
  },
);
chrome.commands.onCommand.addListener((command): void => {
  if (command === "panik-key") {
    chrome.tabs.query({ url: "*://moodle.jsp.jena.de/*" }, (value): void => {
      if (value.length > 0) {
        chrome.tabs.update(value[0].id, { highlighted: true });
      } else {
        chrome.tabs.create({
          url: "https://moodle.jsp.jena.de/my",
          active: true,
        });
      }
    });
  }
});
chrome.storage.sync.get(null, (options): void => {
  const defaultOptions: syncStorage = {
    allowMultipleDownloads: false,
    autodashboardredirect: true,
    autologin_untrusted: false,
    autologinredirect: true,
    biggerVideo: true,
    dashboardEmojiFontSize: 100,
    fächer: {},
    forcedownload: true,
    "no-empty-topics": [],
    "no-hidden-topics": false,
    removeNavigationBlock: true,
    reversed_courses: [],
    shortcoursenames: true,
    showemojicourses: true,
    sortedCourses: [],
    todos: {},
    usecoloredprogress: true,
    tilesToList: false,
  };
  Object.keys(defaultOptions).forEach((item: string): void => {
    options[item] == undefined ? (options[item] = defaultOptions[item]) : "";
  });
  chrome.storage.sync.set(options);
});
chrome.storage.local.get(null, (options): void => {
  const defaultOptions: localStorage = {
    courseInfo: {},
    downloaded: [],
    courseProgress: {},
  };
  Object.keys(defaultOptions).forEach((item) => {
    options[item] == undefined ? (options[item] = defaultOptions[item]) : "";
  });
  chrome.storage.local.set(options);
});

chrome.runtime.onConnect.addListener(
  (externalPort: chrome.runtime.Port): void => {
    console.log("runtimeConnect");
    externalPort.onDisconnect.addListener((): void => {
      // const ignoreError = chrome.runtime.lastError;
      console.log("runtimeDicConnect");
      chrome.tabs.query({ active: true }, (tab) => {
        console.log(tab[0]);
        if (tab[0].url.includes("moodle.jsp.jena.de")) {
          chrome.tabs.sendMessage(tab[0].id, { text: "reload" });
        }
      });
    });
  },
);
