import { localStorage, storage, syncStorage } from "../../types";
chrome.runtime.onInstalled.addListener(function (object) {
  if ("install" === object.reason)
    chrome.tabs.create(
      { url: "https://smjt.robertstuendl.com/first-install" },
      function (tab) {
        console.log("New tab launched");
      }
    );
});
chrome.storage.sync.get(null, function (options) {
  const defaultOptions: storage = {
    usecoloredprogress: true,
    showemojicourses: true,
    autologinredirect: true,
    forcedownload: true,
    autodashboardredirect: true,
    autologin_untrusted: false,
    shortcoursenames: true,
    "no-hidden-topics": false,
    reversed_courses: [],
    "no-empty-topics": [],
    todos: {},
    removeNavigationBlock: true,
    fächer: {},
    biggerVideo: true,
    downloaded: [],
    courseInfo: {},
    allowMultipleDownloads: false,
    dashboardEmojiFontSize: 100,
    sortedCourses: [],
  };
  Object.keys(defaultOptions).forEach((item) => {
    options[item] == undefined ? (options[item] = defaultOptions[item]) : "";
  });
  chrome.storage.sync.set(options);
});
chrome.storage.local.get(null, function (options) {
  const defaultOptions: localStorage = {
    downloaded: [],
    courseInfo: {},
  };
  Object.keys(defaultOptions).forEach((item) => {
    options[item] == undefined ? (options[item] = defaultOptions[item]) : "";
  });
  chrome.storage.local.set(options);
});

chrome.runtime.onConnect.addListener(function (externalPort) {
  console.log("runtimeConnect");
  externalPort.onDisconnect.addListener(function () {
    var ignoreError = chrome.runtime.lastError;
    console.log("runtimeDicConnect");
    chrome.tabs.query({ active: true }, (tab) => {
      console.log(tab[0]);
      if (tab[0].url.includes("moodle.jsp.jena.de")) {
        chrome.tabs.sendMessage(tab[0].id, { text: "reload" });
      }
    });
  });
});
