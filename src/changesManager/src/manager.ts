import course2json from "@shared/shared/course2json";
import { Activity, CourseTopics, storage } from "@shared/types";
interface changesNr {
  changes: number;
  added: number;
  edited: number;
  removed: number;
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
  return new Promise((resolveMain, rejectMain) => {
    const allIds: string[] = [];
    document
      .querySelectorAll(
        "div[data-region='paged-content-page'] > .card-deck .card[data-region='course-content']"
      )
      .forEach((item) => {
        var href = (item.children[0] as HTMLLinkElement).href;
        var id = href.slice(href.indexOf("id=") + 3);
        allIds.push(id);
      });
    console.log("ids", allIds);
    function contentChecker(id: string): Promise<contentCheckerOutput> {
      return new Promise((resolve, reject) => {
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
        const dashboardCard = document.querySelector(
          `div[data-course-id='${item.id}'`
        );
        dashboardCard.prepend(generateDashboardCardHeader(item));
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
  return new Promise((resolve, reject) => {
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

/**
 * Wandelt die Themen basierte struktur um, sodass es ein Array mit den Inhalten ist.
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
 *
 * @param a1 Alte IDs
 * @param a2 Neue IDs
 * @stackoverflow https://stackoverflow.com/questions/1187518/how-to-get-the-difference-between-two-arrays-in-javascript
 */
function getIdDiff(a1, a2) {
  var a = [],
    diff = [];

  for (var i = 0; i < a1.length; i++) {
    a[a1[i]] = true;
  }

  for (var i = 0; i < a2.length; i++) {
    if (a[a2[i]]) {
      delete a[a2[i]];
    } else {
      a[a2[i]] = true;
    }
  }

  for (var k in a) {
    diff.push(k);
  }

  return diff;
}

function generateDashboardCardHeader(content: contentCheckerOutput) {
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
  //prettier-ignore
  elem.innerHTML = `${
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
  return elem;
}

export { checkAll, changesNr };
