import { createEmojiImage, createWavesImage } from "./createCourseImage";
import { fächer, syncStorage, localStorage, storage } from "./../../types";
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
import changesManager from "./changesManager";
if (!location.pathname.includes("/mod/quiz/")) {
  chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
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
  });
  // function fireEvent(name, target, options: { [key: string]: any }) {
  //   //Ready: create a generic event
  //   var evt = document.createEvent("Events");
  //   //Aim: initialize it to be the event we want
  //   evt.initEvent(name, true, true); //true for can bubble, true for cancelable
  //   //@ts-ignore
  //   evt.options = options;
  //   //FIRE!
  //   target.dispatchEvent(evt);
  //   console.log("THERE EVENT", { name, target, options });
  // }
  const syncStorage: Promise<syncStorage> = new Promise((resolve, reject) => {
    chrome.storage.sync.get(null, resolve);
  });
  const localStorage: Promise<localStorage> = new Promise((resolve, reject) => {
    chrome.storage.local.get(null, resolve);
  });

  Promise.all([syncStorage, localStorage]).then((values) => {
    const options: storage = { ...values[0], ...values[1] };

    const scripts: { match?: string | boolean; script: Function }[] = [
      { match: null, script: prependNavBarButtons },
      { match: "/my/", script: DashboardCourses },
      { match: "/my/", script: changesManager },
      { match: null, script: navigationBlock },
      { match: null, script: footer },
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
    ];
    scripts.forEach((script) => {
      if (
        script.match === null ||
        (typeof script.match === "string"
          ? location.pathname.includes(script.match)
          : script.match)
      ) {
        Promise.resolve().then(() => {
          script.script({ options });
        });
      }
    });

    document.querySelector("html").style.scrollBehavior = "smooth";
    console.log("script.js");
    chrome.runtime.sendMessage({ message: "activate_icon" });

    if (location.pathname === "/course/view.php") {
      if (options["no-hidden-topics"] === true) {
        document.body.classList.add("no-hidden-topics");
      }
      // document.querySelectorAll(".activity .actions").forEach((item) => {
      //   const addTodoBtn = document.createElement("div");
      //   addTodoBtn.classList.add("btn", "btn-secondary");
      //   addTodoBtn.innerHTML = "<i class='fa fa-plus'></i> Todo";
      //   addTodoBtn.style.marginRight = "5px";
      //   addTodoBtn.addEventListener("click", (e) => {
      //     fireEvent("addTodo", window, {
      //       course: document.querySelector("div.page-header-headings h1")
      //         .textContent,
      //       title: (e.target as HTMLDivElement).parentElement.parentElement
      //         .children[0].textContent,
      //     });
      //     window.scrollTo({ behavior: "smooth", top: 0, left: 0 });
      //   });
      //   item.prepend(addTodoBtn);
      // });
    }
  });
}
