import { courseProgress, fächer, storage } from "./../types";
import { createEmojiImage, createWavesImage } from "./createCourseImage";
import { getIdFromLink, replaceSpecialChars } from "./utils";
import { FächerList } from "./..//utils";
import { scale as chromaScale } from "chroma-js";
import {
  card,
  vertFlex,
  span,
  button,
  freeVerticalSpace,
  h5,
} from "./htmlBuilder";
import { activate as activateSortable, sortCourses } from "./sortableCourses";
import { renewChangeDescriptors } from "./changesManager";
import { calculateProgressPercentage } from "./courseProgress";

function getViewType(html?: string): "list" | "card" | "summary" {
  console.log(
    document.querySelector(getCoursesQuerySelector(false, "card")),
    getCoursesQuerySelector(false, "card"),
  );
  if (document.querySelector(getCoursesQuerySelector(false, "card")) !== null) {
    console.log(document.querySelector(getCoursesQuerySelector(false, "card")));
    return "card";
  } else if (
    document.querySelector(getCoursesQuerySelector(false, "list")) !== null
  ) {
    console.log(document.querySelector(getCoursesQuerySelector(false, "list")));
    return "list";
  } else if (
    document.querySelector(getCoursesQuerySelector(false, "summary")) !== null
  ) {
    console.log(
      document.querySelector(getCoursesQuerySelector(false, "summary")),
    );
    return "summary";
  } else {
    //again,... some random numbers...
    alert("Error getting ViewType #1156464946546");
  }
}
/**
 * Gibt den Query Selector für den passenden ViewType aus.
 * 🛑 Gibt auch für `summary` aus!
 */
function getCoursesQuerySelector(
  children: boolean,
  type?: "card" | "list" | "summary",
): string {
  const viewType = type ?? getViewType();
  type ? null : console.log("getCoursesQuerySelector__viewType", viewType);
  if (viewType === "card") {
    return (
      "div[data-region='page-container'] div[data-region='paged-content-page'] > .card-deck" +
      (children ? " .card[data-region='course-content']" : "")
    );
  } else if (viewType === "list") {
    return (
      "div[data-region='paged-content-page'] > ul.list-group" +
      (children ? " > li.course-listitem" : "")
    );
  } else if (viewType === "summary") {
    return (
      'div[data-region="paged-content-page"] > div[role="list"]' +
      (children ? ' > div[role="listitem"]' : "")
    );
  } else {
    // rando nr for code-search
    alert("viewType error #798465132");
  }
}

export default function (params: { options: storage }): void {
  const { options } = params;

  try {
    changeAllCards({ options });
    changeAllListItems({ options });
  } catch (err) {
    err;
  }
  // const courseNames = [];

  // Configuration of the observer:
  const config = {
    attributes: true,
    childList: true,
    characterData: true,
    subtree: true,
  };
  let lastViewType = document
    .querySelector("div[data-region='courses-view']")
    .getAttribute("data-display");
  const observer = new MutationObserver((mutations: MutationRecord[]): void => {
    mutations.forEach(() => {
      changeAllCards({ options });
      changeAllListItems({ options });

      const type = document
        .querySelector("div[data-region='courses-view']")
        .getAttribute("data-display");
      let newTypeSeen = false;
      if (
        type === "card" &&
        document.querySelectorAll(
          "div[data-region='paged-content-page'] > .card-deck .card[data-region='course-content']",
        ).length > 0
      ) {
        newTypeSeen = true;
      } else if (
        type === "list" &&
        document.querySelectorAll(
          "div[data-region='paged-content-page'] > ul.list-group > li.course-listitem",
        ).length > 0
      ) {
        newTypeSeen = true;
      }

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
}

//TODO: make detection if mainCourses are shown public to all function (by making it an event(?))
let fired = false;
function changeAllListItems(params: { options: storage }): void {
  const { options } = params;
  const Fächer: fächer = options["fächer"];
  if (!fired) {
    if (
      document.querySelectorAll(
        "div[data-region='paged-content-page'] > ul.list-group > li.course-listitem",
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

      // const name = nameElement.innerText.trim();

      const id = getIdFromLink(nameElement.href);

      //#region KursName + Emoji
      let courseData = null;
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
      console.log(`syncCourse(${id}, ${nameElement.innerText.trim()});`);
      syncCourse(id, nameElement.innerText.trim());
      //#endregion

      //Die Trennung zwischen den Listen-Elementen sichtbarer machen
      item.parentElement.style.borderColor = "rgb(255,255,255,0.13)";
      //TODO: Make compatible with new courseProgress-System
      if (options["usecoloredprogress"] === true) {
        const progressbar = item.querySelector(
          ".progress-bar.bar",
        ) as HTMLDivElement;
        if (progressbar != null) {
          const value = Number(
            item
              .querySelector(".progress-bar.bar")
              .getAttribute("aria-valuenow"),
          );
          const hsl = chromaScale(["#ff0000", "#00ff1e"])
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

function changeAllCards(params: { options: storage }): void {
  if (!fired) {
    if (
      document.querySelectorAll(
        "div[data-region='paged-content-page'] > .card-deck .card[data-region='course-content']",
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
      const smjtEnhanced = item.getAttribute("data-moodlehelperenhanced");
      if (smjtEnhanced == "true") {
        return;
      } else {
        item.setAttribute("data-moodlehelperenhanced", "true");
      }

      // remove bg-white class: no need for white bg ^_____^
      const bgWhiteTempItem = item.querySelector(".bg-white");
      if (bgWhiteTempItem) {
        bgWhiteTempItem.classList.remove("bg-white");
      }

      try {
        const name = (
          item.children[1].children[0].children[0].children[1]
            .children[2] as HTMLSpanElement
        ).innerText.trim();
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
              "true",
            );
            (
              item.children[1].children[0].children[0].children[1]
                .children[2] as HTMLSpanElement
            ).style.fontSize = "20px";
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
                Fächer[id].imageType == "emoji_bg" ? Fächer[id].color : null,
              ),
            )}")`;
          }

          //* Muster
          else if (Fächer[id].imageType == "muster") {
            const waves = createWavesImage(Fächer[id].color);
            cardImgDiv.style.backgroundImage = `url("data:image/svg+xml,${encodeURIComponent(
              waves,
            )}")`;
            cardImgDiv.style.transform = "rotateZ(180deg)";
          }
          //* Emoji + Muster
          else if (Fächer[id].imageType == "emoji_muster") {
            // Transform original Card to Waves
            const waves = createWavesImage(Fächer[id].color);
            cardImgDiv.style.backgroundImage = `url("data:image/svg+xml,${encodeURIComponent(
              waves,
            )}")`;
            cardImgDiv.style.transform = "rotateZ(180deg)";

            // Create new Emoji Card
            const emojiCard = document.createElement("div");
            emojiCard.className = "card-img dashboard-card-img";
            emojiCard.style.backgroundImage = `url("data:image/svg+xml,${encodeURIComponent(
              createEmojiImage(
                Fächer[id].emoji,
                options.dashboardEmojiFontSize,
              ),
            )}")`;

            // Brining it all together
            cardImgDiv.parentElement.style.position = "relative";
            emojiCard.style.position = "absolute";
            emojiCard.style.zIndex = "9";
            cardImgDiv.parentElement.insertAdjacentElement(
              "afterbegin",
              emojiCard,
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
          (
            item.children[1].children[0].children[0].children[1]
              .children[2] as HTMLSpanElement
          ).style.fontWeight = "bold";
        }

        //(item as HTMLDivElement).style.backgroundColor = "#0f172a";
        (item as HTMLDivElement).style.backgroundColor = "#1E293B";

        const smallFooterCard = item.querySelector(
          ".card-footer .small",
        ) as HTMLSpanElement;
        if (smallFooterCard) smallFooterCard.style.color = "#cbd5e1";

        try {
          (
            item.children[1].children[0].children[0].children[1]
              .children[2] as HTMLSpanElement
          ).style.color = `#39CCCC`;
          const theProgressBar = item.querySelector(
            ".progress-bar.bar",
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

        if (item.querySelector(".progress-bar.bar") != null) {
          item.querySelector(".progress-bar.bar").id =
            generateProgressbarId(id);

          manageProgressbar(
            id,
            options.courseProgress[id] != undefined &&
              options.courseProgress[id] !== false
              ? calculateProgressPercentage(
                  options.courseProgress[id] as courseProgress,
                )
              : parseInt(
                  item
                    .querySelector(".progress-bar.bar")
                    .getAttribute("aria-valuenow"),
                ),
          );
        }
      } catch (err) {
        console.warn(err);
      }
      //item.insertAdjacentElement("afterbegin", generateDashboardCardHeader(1));
    });
}

function generateProgressbarId(courseId: string) {
  return `smjt-course-progressbar-${courseId}`;
}

function manageProgressbar(courseId: string, percentage: number): void {
  console.log("percentage", percentage);
  // Um mich vor meiner eigenen DUmmheit zu schützen
  const id = courseId.includes("smjt-course-progressbar")
    ? courseId.replace("smjt-course-progressbar-", "")
    : courseId;

  //TODO: Check for coloredprogress feature-flag
  //TODO: Listen-Ansicht unterstützen
  if (document.getElementById(generateProgressbarId(id)) != null) {
    const hsl = chromaScale(["#ff0000", "#00ff1e"])
      .domain([0, 75, 95, 100])
      .mode("hsl")(Number(percentage))
      .css();

    (
      document
        .getElementById(generateProgressbarId(id))
        .parentElement.parentElement.parentElement.querySelector(".coursename ")
        .children[2] as HTMLSpanElement
    ).style.color = hsl;

    document.getElementById(generateProgressbarId(id)).style.backgroundColor =
      hsl;
    document.getElementById(
      generateProgressbarId(id),
    ).style.width = `${percentage.toFixed()}%`;

    (
      document
        .getElementById(generateProgressbarId(id))
        //Ist zwar eigentlich ein <strong> aber das gab es nicht zur Auswahl.
        .parentElement.parentElement.querySelector(
          ".small strong",
        ) as HTMLSpanElement
    ).innerText = String(percentage.toFixed());
    (
      document
        .getElementById(generateProgressbarId(id))
        //Ist zwar eigentlich ein <strong> aber das gab es nicht zur Auswahl.
        .parentElement.parentElement.querySelector(
          ".small strong",
        ) as HTMLSpanElement
    ).setAttribute("aria-valuenow", String(percentage.toFixed()));

    console.log("ManageProgressBar");
  } else {
    console.log("No Progressbar to manage");
  }
}

let addedInfoToPage = false;
function addInfo(): void {
  if (!addedInfoToPage) {
    document.querySelector("header#page-header").insertAdjacentElement(
      "beforeend",
      card({
        child: vertFlex({
          children: [
            h5({
              text: "Hinweis!",
            }),
            span({
              text: "Es wurden neue Kurse erkannt. Aktualisiere diese Seite um Änderungen zu sehen.",
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
        style: "width: 100%; margin: 16px; border: 2.5px solid #FF851B",
      }),
    );
    addedInfoToPage = true;
  }
}
const syncCourseCue: { id: string; longName: string }[] = [];
let syncCourseWorking = false;
function syncCourse(id: string, longName: string): void {
  if (!syncCourseWorking) {
    syncCourseWorking = true;
    chrome.storage.sync.get("fächer", (args: { fächer: fächer }) => {
      const { fächer } = args;
      if (fächer[id] == undefined) {
        addInfo();
        const Fach = Object.keys(FächerList).filter((item) => {
          return (
            " " +
            longName.replace(/[^a-z\d\s]+/gi, "").toLowerCase() +
            " "
          ).includes(
            " " + item.replace(/[^a-z\d\s]+/gi, "").toLowerCase() + " ",
          );
        })?.[0];
        fächer[id] = {
          color: "#ffffff",
          emoji: Fach ? FächerList[Fach] : "",
          imageType: FächerList[Fach] ? "emoji" : "original",
          long: longName,
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

export { getViewType, getCoursesQuerySelector, manageProgressbar };
