import prependNavBarButtons from "./navbar";
import DashboardCourses from "./DashboardCourses";
import navigationBlock from "./navigationBlock";
import footer from "./footer";
import meineKurse from "./meineKurse";
import downloader from "./downloader";
import staticSidebarBlock from "./staticSidebarBlock";
import login from "./login";
import syncCourses from "./syncTopics";
import topicsManager from "./topicsManager";

import commandPalette from "./commandPalette";

import changesManager from "./changesManager";
//TODO: Remove commenting when script exists.
//import courseSorting from "./courseSorting";
import scriptManager from "./scriptManager";
import noAssignForceDownload from "./noAssignForceDownload";
import tileCourseManager from "./tileCourseManager";
import { storage } from "@/types";

if (!location.pathname.includes("/mod/quiz/")) {
  const newStyle = document.createElement("style");
  newStyle.appendChild(
    document.createTextNode(
      "\
@font-face {\
    font-family: " +
        "Sans Forgetica" +
        ";\
    src: url('" +
        chrome.runtime.getURL("fonts/SansForgetica-Regular.otf") +
        "') format('opentype');\
}\
",
    ),
  );

  document.head.appendChild(newStyle);
  chrome.runtime.onMessage.addListener(
    (
      msg: any,
      sender: chrome.runtime.MessageSender,
      sendResponse: (arg: any) => void,
    ): void => {
      console.log("Message", { msg, sender });
      // If the received message has the expected format...
      if (msg.text === "report_back") {
        // Call the specified callback, passing
        // the web-page's DOM content as argument

        sendResponse(document.body.innerHTML);
      }
      if (msg.text === "goto") {
        // Call the specified callback, passing
        // the web-page's DOM content as argument

        window.location.href = msg.url;
      }
      if (msg.text === "reload") {
        location.reload();
      }
    },
  );

  scriptManager([
    { match: null, script: prependNavBarButtons },
    { match: "/my/", script: DashboardCourses },
    { match: "/my/", script: changesManager },
    { match: null, script: navigationBlock },
    { match: null, script: footer },
    { match: null, script: commandPalette },
    { match: null, script: meineKurse },
    { match: null, script: staticSidebarBlock },
    { match: null, script: login },
    {
      match: location.pathname.slice(-4).toLocaleLowerCase() === ".pdf",
      script: downloader,
    },
    {
      match: location.pathname.startsWith("/course/view.php"),
      script: topicsManager,
    },
    {
      match: location.pathname.startsWith("/course/view.php"),
      script: syncCourses,
    },
    {
      match: location.pathname.startsWith("/mod/assign/view.php"),
      script: noAssignForceDownload,
    },
    {
      match: (options: storage) =>
        location.pathname.startsWith("/course/view.php") &&
        options["tilesToList"],
      script: tileCourseManager,
    },
  ]);

  document.querySelector("html").style.scrollBehavior = "smooth";
}
