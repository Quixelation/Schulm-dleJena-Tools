import { fächer, storage } from "@shared/types";
import { createEmojiImage, createWavesImage } from "./createCourseImage";
import { getIdFromLink, replaceSpecialChars } from "./utils";
import { FächerList } from "./../../utils";
import * as chroma from "chroma-js";
import {
  card,
  vertFlex,
  span,
  button,
  freeVerticalSpace,
  h5,
  icon,
} from "./htmlBuilder";
import { activate as activateSortable, sortCourses } from "./sortableCourses";
import { renewChangeDescriptors } from "./changesManager";
var dashboardEvents;
export default function (params: { options: storage }) {
  const { options } = params;

  try {
    changeAllCards({ options });
    changeAllListItems({ options });
  } catch (err) {
    err;
  }
  const courseNames = [];

  // Configuration of the observer:
  var config = {
    attributes: true,
    childList: true,
    characterData: true,
    subtree: true,
  };
  var lastViewType = document
    .querySelector("div[data-region='courses-view']")
    .getAttribute("data-display");
  var observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      changeAllCards({ options });
      changeAllListItems({ options });

      const type = document
        .querySelector("div[data-region='courses-view']")
        .getAttribute("data-display");
      var newTypeSeen: boolean = false;
      if (
        type === "card" &&
        document.querySelectorAll(
          "div[data-region='paged-content-page'] > .card-deck .card[data-region='course-content']"
        ).length > 0
      ) {
        newTypeSeen = true;
      } else if (
        type === "list" &&
        document.querySelectorAll(
          "div[data-region='paged-content-page'] > ul.list-group > li.course-listitem"
        ).length > 0
      ) {
        newTypeSeen = true;
      }
      console.log({ type, newTypeSeen });
      if (
        type !== lastViewType &&
        ["card", "list"].includes(type) &&
        newTypeSeen
      ) {
        console.log("Call Change Listener");
        lastViewType = type;
        // Für den ChangeManager die Kurs-Header aktualisieren, weil die verloren gehen, wenn der "ViewType" gewechselt wird.
        renewChangeDescriptors();

        //Die Kurse nach dem Ansichts-Wechsel für die neue Ansicht sortieren
        sortCourses();
      }
    });
  });
  observer.observe(document.querySelector("#block-region-content"), config);

  //TODO: Add observer to observe the "data-display" Attribute of "div[data-region='courses-view']", that contains the info about Card/List. This should be fired for changesManager or sortableCourses
}

//TODO: make detection if mainCourses are shown public to all function (by making it an event(?))
var fired = false;
function changeAllListItems(params: { options: storage }) {
  const { options } = params;
  const Fächer: fächer = options["fächer"];
  if (!fired) {
    if (
      document.querySelectorAll(
        "div[data-region='paged-content-page'] > ul.list-group > li.course-listitem"
      ).length > 0
    ) {
      activateSortable();
      fired = true;
    }
  }
  document
    .querySelectorAll("div[id^='courses-view'] ul.list-group li div.row")
    .forEach((item) => {
      if (item.getAttribute("data-moodlehelperenhanced") == "true") {
        return;
      } else {
        item.setAttribute("data-moodlehelperenhanced", "true");
      }

      (item.parentElement as HTMLLIElement).style.backgroundColor = "#1E293B";

      //#region NameSection
      const nameSection = item.children[0];

      const nameElement = nameSection.children[0]
        .children[1] as HTMLAnchorElement;

      const name = nameElement.innerText.trim();

      const id = getIdFromLink(nameElement.href);

      //#region KursName + Emoji
      var courseData = null;
      if (Object.keys(Fächer).includes(id)) {
        if (
          options["shortcoursenames"] === true &&
          Fächer[id].short !== undefined &&
          Fächer[id].short?.trim() !== ""
        ) {
          courseData = {
            short: Fächer[id].short,
            emoji: Fächer[id].emoji,
          };
          nameElement.setAttribute("data-moodlehelperfilteredname", "true");
          nameElement.style.fontSize = "20px";
        }
      }
      //TODO: "Der Kurs ist als Favorit markiert." wieder hinzufügen. (Möglicherweise mit check, ob dieser String im textContent vorhanden ist)

      //ScreenReader Text entfernen, damit später innerText verwendet werden kann und "Kursname" nicht erscheint
      nameElement.querySelectorAll(".sr-only").forEach((e) => e.remove());
      nameElement.innerHTML = `
          <span style="display: grid; grid-template-columns: 35px auto auto; align-items: center">
            <span style="justify-self: left">${
              courseData ? courseData.emoji : ""
            }</span>
            <span>${
              courseData
                ? courseData.short
                : replaceSpecialChars(nameElement.innerText)
            }</span>
          </span>
          `;
      //#endregion

      //Die Trennung zwischen den Listen-Elementen sichtbarer machen
      item.parentElement.style.borderColor = "rgb(255,255,255,0.13)";

      if (options["usecoloredprogress"] === true) {
        var progressbar = item.querySelector(
          ".progress-bar.bar"
        ) as HTMLDivElement;
        if (progressbar != null) {
          const value = Number(
            item
              .querySelector(".progress-bar.bar")
              .getAttribute("aria-valuenow")
          );
          const hsl = chroma
            .scale(["#ff0000", "#00ff1e"])
            .domain([0, 75, 95, 100])
            .mode("hsl")(value)
            .css();

          nameElement.style.color = hsl;
          if (value !== 100) {
            nameElement.style.fontWeight = "bold";
          }
          progressbar.style.backgroundColor = hsl;

          // Text unter der progressbar sichtbar machen mit Farbänderung
          if (item.querySelector(".small") as HTMLSpanElement)
            (item.querySelector(".small") as HTMLSpanElement).style.color =
              "#cbd5e1";
        }
      }

      nameSection.querySelector("div.text-muted.muted").remove();

      //#endregion
    });
}

function changeAllCards(params: { options: storage }) {
  if (!fired) {
    if (
      document.querySelectorAll(
        "div[data-region='paged-content-page'] > .card-deck .card[data-region='course-content']"
      ).length > 0
    ) {
      activateSortable();
      fired = true;
    }
  }
  const { options } = params;
  const Fächer: fächer = options["fächer"];
  document
    .querySelectorAll(".card-deck .card[data-region='course-content']")
    .forEach((item) => {
      if (item.getAttribute("data-moodlehelperenhanced") == "true") {
        return;
      } else {
        item.setAttribute("data-moodlehelperenhanced", "true");
      }

      // remove bg-white class: no need for white bg ^_____^
      let bgWhiteTempItem = item.querySelector(".bg-white");
      if (bgWhiteTempItem) {
        bgWhiteTempItem.classList.remove("bg-white");
      }

      try {
        const name = (item.children[1].children[0].children[0].children[1]
          .children[2] as HTMLSpanElement).innerText.trim();
        const id = getIdFromLink((item.children[0] as HTMLLinkElement).href);

        try {
          syncCourse(id, name);
        } catch (err) {
          err;
        }
        if (Object.keys(Fächer).includes(id)) {
          if (
            options["shortcoursenames"] === true &&
            Fächer[id].short !== undefined &&
            Fächer[id].short?.trim() !== ""
          ) {
            item.children[1].children[0].children[0].children[1].children[2].textContent =
              Fächer[id].short;
            item.children[1].children[0].children[0].children[1].children[2].setAttribute(
              "data-moodlehelperfilteredname",
              "true"
            );
            (item.children[1].children[0].children[0].children[1]
              .children[2] as HTMLSpanElement).style.fontSize = "20px";
            item.children[1].children[0].children[0].children[0].children[1].textContent =
              "";
          }

          //#region Img-Design
          const cardImgDiv = item.children[0].children[0] as HTMLDivElement;
          //* Emoji
          if (
            Fächer[id].imageType == "emoji" ||
            Fächer[id].imageType == "emoji_bg"
          ) {
            cardImgDiv.style.backgroundImage = `url("data:image/svg+xml,${encodeURIComponent(
              createEmojiImage(
                Fächer[id].emoji,
                options.dashboardEmojiFontSize,
                Fächer[id].imageType == "emoji_bg" ? Fächer[id].color : null
              )
            )}")`;
          }

          //* Muster
          else if (Fächer[id].imageType == "muster") {
            const waves = createWavesImage(Fächer[id].color);
            cardImgDiv.style.backgroundImage = `url("data:image/svg+xml,${encodeURIComponent(
              waves
            )}")`;
            cardImgDiv.style.transform = "rotateZ(180deg)";
          }
          //* Emoji + Muster
          else if (Fächer[id].imageType == "emoji_muster") {
            // Transform original Card to Waves
            const waves = createWavesImage(Fächer[id].color);
            cardImgDiv.style.backgroundImage = `url("data:image/svg+xml,${encodeURIComponent(
              waves
            )}")`;
            cardImgDiv.style.transform = "rotateZ(180deg)";

            // Create new Emoji Card
            const emojiCard = document.createElement("div");
            emojiCard.className = "card-img dashboard-card-img";
            emojiCard.style.backgroundImage = `url("data:image/svg+xml,${encodeURIComponent(
              createEmojiImage(Fächer[id].emoji, options.dashboardEmojiFontSize)
            )}")`;

            // Brining it all together
            cardImgDiv.parentElement.style.position = "relative";
            emojiCard.style.position = "absolute";
            emojiCard.style.zIndex = "9";
            cardImgDiv.parentElement.insertAdjacentElement(
              "afterbegin",
              emojiCard
            );
          }
          //* BG
          else if (Fächer[id].imageType == "bg") {
            cardImgDiv.style.backgroundImage = ``;
            cardImgDiv.style.background = Fächer[id].color;
          }

          //#endregion
        }
        // Wenn nicht 100% Fortschritt, dann Titel Fett
        if (
          item.querySelector(".progress-bar.bar")
            ? item
                .querySelector(".progress-bar.bar")
                .getAttribute("aria-valuenow") != "100"
            : false
        ) {
          (item.children[1].children[0].children[0].children[1]
            .children[2] as HTMLSpanElement).style.fontWeight = "bold";
        }

        //(item as HTMLDivElement).style.backgroundColor = "#0f172a";
        (item as HTMLDivElement).style.backgroundColor = "#1E293B";

        var smallFooterCard = item.querySelector(
          ".card-footer .small"
        ) as HTMLSpanElement;
        if (smallFooterCard) smallFooterCard.style.color = "#cbd5e1";

        try {
          (item.children[1].children[0].children[0].children[1]
            .children[2] as HTMLSpanElement).style.color = `#39CCCC`;
          var theProgressBar = item.querySelector(
            ".progress-bar.bar"
          ) as HTMLDivElement;
          if (theProgressBar) {
            theProgressBar.style.backgroundColor = `#39CCCC`;
          }
        } catch (err) {
          console.error("Default Colors Assign Error!", err);
        }

        // try {
        //   //TODO: Screen-Reader Support
        //   const editBtn = document.createElement("button");
        //   editBtn.className = "btn btn-link btn-icon icon-size-3 coursemenubtn";
        //   // Used in the official Moodle Site
        //   editBtn.type = "button";
        //   editBtn.append(
        //     icon({ options: { icon: "edit" }, style: "color: white;" })
        //   );

        //   /*
        //     <button class="btn btn-link btn-icon icon-size-3 coursemenubtn" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        //         <i class="icon fa fa-ellipsis-h fa-fw " aria-hidden="true"></i>
        //         !!Missing:
        //         !!    <span class="sr-only">
        //         !!       Aktion für derzeitigen Kurs 10-F, Kunst, Surrealismus/ ISMEN
        //         !!    </span>
        //     </button>
        //    */

        //   item.querySelector(".card-body > div").append(editBtn);
        // } catch (e) {
        //   e;
        // }

        if (options["usecoloredprogress"] === true) {
          if (item.querySelector(".progress-bar.bar") != null) {
            const hsl = chroma
              .scale(["#ff0000", "#00ff1e"])
              .domain([0, 75, 95, 100])
              .mode("hsl")(
                Number(
                  item
                    .querySelector(".progress-bar.bar")
                    .getAttribute("aria-valuenow")
                )
              )
              .css();

            (item.children[1].children[0].children[0].children[1]
              .children[2] as HTMLSpanElement).style.color = hsl;

            (item.querySelector(
              ".progress-bar.bar"
            ) as HTMLDivElement).style.backgroundColor = hsl;
          }
        }
      } catch (err) {
        console.warn(err);
      }
      //item.insertAdjacentElement("afterbegin", generateDashboardCardHeader(1));
    });
}

var addedInfoToPage = false;
function addInfo() {
  if (!addedInfoToPage) {
    document.querySelector("header#page-header").insertAdjacentElement(
      "beforeend",
      card({
        style: "width: 100%; margin: 16px; border: 2.5px solid #FF851B",
        child: vertFlex({
          children: [
            h5({
              text: "Hinweis!",
            }),
            span({
              text:
                "Es wurden neue Kurse erkannt. Aktualisiere diese Seite um Änderungen zu sehen.",
            }),
            span({
              text: "(SchulmoodleJena Tools)",
            }),
            freeVerticalSpace({ options: { height: "15px" } }),
            button({
              options: { onclick: () => location.reload() },
              child: span({ text: "Aktualisieren" }),
              style: "width: min-content",
            }),
          ],
        }),
      })
    );
    addedInfoToPage = true;
  }
}
const syncCourseCue: { id: string; longName: string }[] = [];
var syncCourseWorking = false;
function syncCourse(id: string, longName: string) {
  if (!syncCourseWorking) {
    syncCourseWorking = true;
    chrome.storage.sync.get("fächer", (args: { fächer: fächer }) => {
      var { fächer } = args;
      if (fächer[id] == undefined) {
        addInfo();
        const Fach = Object.keys(FächerList).filter((item) => {
          return (
            " " +
            longName.replace(/[^a-z\d\s]+/gi, "").toLowerCase() +
            " "
          ).includes(
            " " + item.replace(/[^a-z\d\s]+/gi, "").toLowerCase() + " "
          );
        })?.[0];
        fächer[id] = {
          long: longName,
          emoji: Fach ? FächerList[Fach] : "",
          imageType: FächerList[Fach] ? "emoji" : "original",
          color: "#ffffff",
          short: Fach,
        };
      }
      chrome.storage.sync.set({ fächer }, () => {
        syncCourseWorking = false;

        if (syncCourseCue.length > 0) {
          const next = syncCourseCue[0];
          syncCourseCue.shift();
          syncCourse(next.id, next.longName);
        }
      });
    });
  } else {
    syncCourseCue.push({ id, longName });
  }
}
