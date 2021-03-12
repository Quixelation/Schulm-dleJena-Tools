import { fächer, storage } from "@shared/types";
import { createEmojiImage, createWavesImage } from "./createCourseImage";
import { getIdFromLink } from "./utils";
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

export default function (params: { options: storage }) {
  const { options } = params;

  try {
    changeAll({ options });
  } catch (err) {
    err;
  }
  const courseNames = [];
  var observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      console.log("Mutation");
      changeAll({ options });
    });
  });

  // Configuration of the observer:
  var config = {
    attributes: true,
    childList: true,
    characterData: true,
    subtree: true,
  };

  // Pass in the target node, as well as the observer options
  observer.observe(document.querySelector("#block-region-content"), config);
}

function changeAll(params: { options: storage }) {
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
      console.log("Changing Dashboard");

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
            console.log("EmojiCourseIMage");
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
