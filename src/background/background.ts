import { defaultTaskPrio } from "./../shared/defaults";
import { syncTodoist } from "./../shared/todoist";

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

// Storage: Todos Migration
chrome.storage.local.get("todos", (values: extension.storage.local) => {
  if(values["todos"] == null){
    chrome.storage.sync.get(["todos"], (values) => {
      if (values["todos"]) {
        const newData = {};
        Object.keys(values["todos"]).forEach((todoKey) => {
          newData[todoKey] = {
            ...values["todos"][todoKey],
            sync: { todoist: null },
            priority: { ha: 2, video: 3, exam: 4 },
            deleted: false,
            isMoodle: false,
          } as todoItem;
        });
        chrome.storage.local.set({ todos: newData });
      }
    });
  }
})

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
  const defaultOptions: extension.storage.sync = {
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
    usecoloredprogress: true,
    tilesToList: false,
    alwaysShowCustomProgress: false,
    //TODO: Change Colors
    "todo-prio": defaultTaskPrio,
  };
  Object.keys(defaultOptions).forEach((item: string): void => {
    options[item] == undefined ? (options[item] = defaultOptions[item]) : "";
  });
  chrome.storage.sync.set(options);
});
chrome.storage.local.get(null, (options): void => {
  const defaultOptions: extension.storage.local = {
    courseInfo: {},
    downloaded: [],
    "todoist-oauth-token": null,
    "todoist-project-id": null,
    "todo-close-on-complete": false,
    todos: {},
    "todos-moodle": {},
    "todos-todoist-lastSynced": null,
    "todoist-active": false,
    courseProgress: {},
    lastSeenWhatsNew: null,
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

chrome.webRequest.onBeforeRequest.addListener(
  function (details) {
    const url = new URL(details.url);
    if (url.href.includes("/api/todoist-loggedin")) {
      chrome.storage.local.set({
        "todoist-oauth-token": url.searchParams.get("token"),
      });
      return {
        redirectUrl: "https://moodle.jsp.jena.de/?smjtaction=todoist-loggedin",
      };
    }
    if (
      url.href.includes("/api/todoist-oauth") &&
      url.searchParams.get("smjt_state") == null
    ) {
      url.searchParams.append("smjt_state", chrome.runtime.id);
      url.searchParams.append("client_id", "dffd8cf0da854df890922f69d6ff43a1");

      return { redirectUrl: url.href };
    }
  },
  {
    urls: ["https://smjt.robertstuendl.com/*"],
  },
  ["blocking"],
);

chrome.alarms.create("todoist-sync", {
  periodInMinutes: 15,
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "todoist-sync") {
    console.log("Alarm Todoist Sync");
    //TODO: Add A little Check (var: false; before saving --> var: true; after saving) so that no todo goes missing.
    syncTodoist();
  }
});

//TODO: von todos auf sync zu todos auf lokal migrieren
