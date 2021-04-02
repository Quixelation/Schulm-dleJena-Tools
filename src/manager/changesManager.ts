import { Activity, CourseTopics, storage } from "@shared/types";
import course2json from "./course2json";
import {
  card,
  cardButton,
  container,
  Heading,
  vertFlex,
  button as htmlBuilderButton,
  span,
} from "./htmlBuilder";
import { saveCourse } from "./syncTopics";

//TODO: Show number of uncheckable Courses

let cachedChanges: contentCheckerOutput[] = null;

export default function (params: { options: storage }): void {
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  const { options } = params;

  const changesManagerCardButton = cardButton({
    options: {
      text: "Änderungen ansehen",
      icon: "rocket",
      link: "javascript:void(0);",
    },
    onclick: () => {
      const loadingText = card({
        child: Heading({
          text: "Alle Kurse werden überprüft...",
          options: {
            type: "h3",
          },
        }),
      });

      changesManagerArea.replaceChild(loadingText, changesManagerCardButton);

      checkAll().then((value) => {
        changesManagerArea.replaceChild(
          card({
            child: vertFlex({
              children: [
                Heading({
                  text: `<b style="color: #0074D9">${
                    value.changes
                  }</b> Änderung${value.changes === 1 ? "" : "en"} gefunden`,
                  options: {
                    type: "h3",
                  },
                  id: "ÄnderungHeading",
                }),
                Heading({
                  text: `<b style="color: #2ECC40; font-weight: bold;">${
                    value.added
                  }</b> neue${value.added === 1 ? "r" : ""} Inhalt${
                    value.added === 1 ? "" : "e"
                  }`,
                  options: { type: "h5" },
                  id: "AddedHeading",
                }),
                Heading({
                  text: `<b style="color: #FF4136; font-weight: bold;">${
                    value.removed
                  }</b> Inhalt${value.removed === 1 ? "" : "e"} entfernt`,
                  options: { type: "h5" },
                  id: "RemovedHeading",
                }),
                value.changes > 0
                  ? htmlBuilderButton({
                      style: "margin-top: 10px",
                      onclick: () => {
                        document.getElementById(
                          "SpanHtmlBuilderButtonSaveAllCourseTopics"
                        ).innerText = "Speichert & Entfernt";
                        (document.getElementById(
                          "htmlBuilderButtonSaveAllCourseTopics"
                        ) as HTMLButtonElement).disabled = true;
                        saveAllCourseTopics().then(() => {
                          document
                            .getElementById(
                              "htmlBuilderButtonSaveAllCourseTopics"
                            )
                            .remove();
                          document.getElementById(
                            "ÄnderungHeading"
                          ).innerHTML = `<b style="color: #0074D9">0</b> Änderungen gefunden`;
                          document.getElementById(
                            "AddedHeading"
                          ).innerHTML = `<b style="color: #2ECC40; font-weight: bold;">0</b> neue Inhalte`;
                          document.getElementById(
                            "RemovedHeading"
                          ).innerHTML = `<b style="color: #FF4136; font-weight: bold;">0</b> Inhalte entfernt`;
                        });
                      },
                      id: "htmlBuilderButtonSaveAllCourseTopics",
                      options: { type: "primary" },
                      child: span({
                        text: "Alle Änderungen speichern",
                        id: "SpanHtmlBuilderButtonSaveAllCourseTopics",
                      }),
                    })
                  : null,
              ],
            }),
          }),
          loadingText
        );
      });
    },
  });

  const changesManagerArea = container({
    children: [changesManagerCardButton],
  });

  //   const newSection = document.createElement("section");
  //   newSection.id = "changesManager";
  document
    .querySelector("section.block_myoverview")
    .insertAdjacentElement("beforebegin", changesManagerArea);
}

interface changesNr {
  changes: number;
  added: number;
  edited: number;
  removed: number;
  /**
   * Boolean, welche angibt, ob es vorher noch keinen Eintrag im LocalStorage von diesem Kurs gab
   */
  allNew: boolean;
}

interface contentCheckerOutput extends changesNr {
  id: string;
  content: CourseTopics;
  status: "success" | "not-supported" | "error";
  errorDesc?: string;
}
function checkAll(): Promise<changesNr> {
  console.log("checkAll");
  return new Promise((resolveMain) => {
    const allIds: string[] = [];
    document
      .querySelectorAll(
        (() => {
          switch (getViewType()) {
            case "card":
              return "div[data-region='paged-content-page'] > .card-deck .card[data-region='course-content']";
            case "list":
              return "ul.list-group li.list-group-item.course-listitem";
            default:
              return null;
          }
        })()
      )
      .forEach((item) => {
        const href = item.querySelector("a").href;
        const id = href.slice(href.indexOf("id=") + 3);
        allIds.push(id);
      });
    console.log("ids", allIds);
    function contentChecker(id: string): Promise<contentCheckerOutput> {
      return new Promise((resolve) => {
        fetch("https://moodle.jsp.jena.de/course/view.php?id=" + id)
          .then((e) => e.text())
          .then(course2json)
          .then((e) => {
            if (e.status === "error") {
              resolve({
                id,
                changes: 0,
                added: 0,
                removed: 0,
                edited: 0,
                content: {},
                status: e.status,
                errorDesc: e.desc,
                allNew: false,
              });
            } else if (e.status === "not-supported") {
              resolve({
                id,
                changes: 0,
                added: 0,
                removed: 0,
                edited: 0,
                content: {},
                status: e.status,
                allNew: false,
              });
            } else {
              compare(id, e.list).then((c) =>
                resolve({ ...c, id, content: e.list, status: e.status })
              );
            }
          });
      });
    }
    const promises = [];
    allIds.forEach((item) => {
      promises.push(contentChecker(item));
    });
    Promise.all(promises).then((values: contentCheckerOutput[]) => {
      cachedChanges = values;
      generateDashboardChangeDescriptors(values);
      console.log("Called Promise.all().then()");
      const result: changesNr = {
        changes: 0,
        added: 0,
        removed: 0,
        edited: 0,
        allNew: false,
      };
      values.forEach((item) => {
        console.log(item);
        result.changes += item.changes;
        result.added += item.added;
        result.removed += item.removed;
      });
      resolveMain(result);
    });
  });
}

/**
 * Vergleicht einen neuen Json-Kursinhalt mit dem in dem lokalen Speicher gespeichertem.
 * @param id Die ID des Kurses
 * @param jsonCourse Der neue Inhalt, mit dem verglichen werden soll
 */
function compare(id: string, jsonCourse: CourseTopics): Promise<changesNr> {
  return new Promise((resolve) => {
    chrome.storage.local.get("courseInfo", (storage: storage) => {
      const { courseInfo } = storage;
      const oldIds = getIdArrayFromActivities(
        topics2activities(courseInfo[id] ?? {})
      ).map(String);
      const newIds = getIdArrayFromActivities(
        topics2activities(jsonCourse)
      ).map(String);
      const result = {
        changes: 0,
        added: 0,
        /**
         * @future
         */
        edited: 0,
        removed: 0,
        allNew: false,
      };
      const diffs = getIdDiff(oldIds, newIds);
      result.changes = diffs.length;
      if (oldIds.length === 0) {
        result.allNew = true;
      }
      diffs.forEach((diff) => {
        diff = diff.toString();
        console.log(oldIds.includes(diff), newIds.includes(diff));
        if (oldIds.includes(diff) && !newIds.includes(diff)) {
          result.removed++;
        } else if (!oldIds.includes(diff) && newIds.includes(diff)) {
          result.added++;
          console.log("added");
        }
      });
      console.log(id, result);
      resolve(result);
    });
  });
}

async function saveAllCourseTopics() {
  for (const changesItem of cachedChanges) {
    await saveCourse(changesItem.id, changesItem.content);
    console.log("Saved", changesItem.id);
  }
}

/**
 * Wandelt die Themen basierte Struktur um, sodass es ein Array mit den Inhalten ist.
 * @param data Die Themen basierte Struktur des Kurses
 */
function topics2activities(data: CourseTopics) {
  const activities: Activity[] = [];
  Object.keys(data).forEach((sectionId) => {
    data[sectionId].activities.forEach((activity) => {
      activities.push(activity);
    });
  });
  return activities;
}

function getIdArrayFromActivities(activities: Activity[]) {
  const ids: number[] = [];
  activities.forEach((activity) => {
    ids.push(activity.id);
  });
  return ids;
}

/**
 * Vergleicht 2 Arrays miteinander und gibt die unterschiede aus
 * @param a1 Alte IDs
 * @param a2 Neue IDs
 * @stackoverflow https://stackoverflow.com/questions/1187518/how-to-get-the-difference-between-two-arrays-in-javascript
 */
function getIdDiff(a1, a2) {
  const a = [],
    diff = [];

  for (let i = 0; i < a1.length; i++) {
    a[a1[i]] = true;
  }

  for (let i = 0; i < a2.length; i++) {
    if (a[a2[i]]) {
      delete a[a2[i]];
    } else {
      a[a2[i]] = true;
    }
  }

  for (const k in a) {
    diff.push(k);
  }

  return diff;
}

/**
 * Erstellt einen Header für die Kurskarten.
 * @param content Das ausgegebene Objekt des ContentCheckers
 * @returns HTML Card Header
 */
function generateDashboardCardHeader(
  content: contentCheckerOutput
): HTMLDivElement {
  const elem = document.createElement("div");
  if (content.status !== "success") {
    elem.style.backgroundColor = "#FF851B";
  } else if (content.changes > 0) {
    elem.style.backgroundColor = "#FF4136";
  } else {
    elem.style.backgroundColor = "#2ECC40";
  }
  elem.style.padding = "5px";
  elem.style.color = "white";
  elem.style.fontWeight = "bold";
  elem.innerHTML = generateTitleText(content);
  return elem;
}

function generateDashboardListTag(content: contentCheckerOutput) {
  console.log("Generating Tag");
  const tag = document.createElement("div");
  if (content.status !== "success") {
    tag.style.backgroundColor = "#FF851B";
  } else if (content.changes > 0) {
    tag.style.backgroundColor = "#FF4136";
  } else {
    tag.style.backgroundColor = "#2ECC40";
  }

  tag.style.fontSize = "13px";
  tag.style.marginLeft = "5px";
  tag.style.padding = "5px 10px";
  tag.style.color = "white";
  tag.style.borderRadius = "999999999px";
  tag.innerHTML = generateTitleText(content);
  return tag;
}

function getViewType() {
  return document
    .querySelector("div[data-region='courses-view']")
    .getAttribute("data-display") as "card" | "list" | "summary";
}

/**
 * Schaut, ob ListView oder CardView und ruft basierend darauf entweder `generateDashboardListTag` oder `generateDashboardCardHeader`
 * @param values Array der Values
 */
function generateDashboardChangeDescriptors(values: contentCheckerOutput[]) {
  console.log("Generating Dashboard Descriptors");
  const type = getViewType();
  console.log("the type is", type);
  values.forEach((item) => {
    if (type === "card") {
      const dashboardCard = document.querySelector(
        `div[data-course-id='${item.id}']`
      );
      dashboardCard.prepend(generateDashboardCardHeader(item));
    } else if (type === "list") {
      document
        .querySelector(`li[data-course-id='${item.id}']`)
        .children[0].children[0].children[0].children[0].children[0].append(
          generateDashboardListTag(item)
        );
    }
  });
}

/**
 * Generiert den Text, welcher auf den Karten / Listen-elementen angezeigt wird
 * @param content
 * @returns Der Generierte Text
 */
function generateTitleText(content: contentCheckerOutput) {
  return `${
    content.allNew
      ? "<abbr title='Das Tool hatte vorher noch keine Daten von diesem Kurs. Öffne diesen Kurs, damit das Tool diesen analysieren kann.'>Alles Neu</abbr>"
      : `${
          content.status === "success"
            ? content.changes +
              " Änderungen " +
              `(+${content.added}/-${content.removed})`
            : content.status === "not-supported"
            ? "<abbr title='Dieser Kurs hat ein Design/Layout, welches (noch) nicht analysiert werden kann.'>Nicht Unterstützt</abbr>"
            : "Fehler" + (content.errorDesc ? `: ${content.errorDesc}` : "")
        }`
  }`;
}

//TODO: Docs
/**
 *  Generate Descriptors again from cachedChanges. Can be used after ViewType changes.
 */
function renewChangeDescriptors(): void {
  console.log("TEST: renews");
  //TODO: Check if ViewType has actually changed; maybe with var that saved last ViewType
  if (cachedChanges !== null) {
    console.log("RENEWING");
    generateDashboardChangeDescriptors(cachedChanges);
  }
}

export {
  checkAll,
  changesNr,
  cachedChanges,
  generateDashboardCardHeader,
  renewChangeDescriptors,
};
