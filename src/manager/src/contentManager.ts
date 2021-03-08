import { Activity, CourseTopics, storage } from "@shared/types";
import { sendNotification } from "../../shared/notifications";
import course2json from "../../shared/course2json";
import { cardButton } from "./htmlBuilder";
import { getIdFromLink } from "./utils";

function generateDashboardCardHeader(number: number | string) {
  const elem = document.createElement("div");
  if (typeof number === "string") {
    elem.style.backgroundColor = "#FF851B";
  } else if (number > 0) {
    elem.style.backgroundColor = "#FF4136";
  } else {
    elem.style.backgroundColor = "#2ECC40";
  }
  elem.style.padding = "5px";
  elem.style.color = "white";
  elem.style.fontWeight = "bold";
  //prettier-ignore
  elem.innerText = `${number}${typeof number === "string" ? "": ` Änderung${number === 1 ? "" : "en"}`}`;
  return elem;
}

function check(id: string): Promise<number[] | string> {
  return new Promise((resolve, reject) => {
    fetch("https://moodle.jsp.jena.de/course/view.php?id=" + id)
      .then((e) => e.text())
      .then(course2json)
      .then((e) => {
        if (typeof e === "string") {
          resolve(e);
        } else {
          compare(id, e).then(resolve);
        }
      });
  });
}
/**
 * Vergleicht einen neuen Json-Kursinhalt mit dem in dem lokalen Speicher gespeichertem.
 * @param id Die ID des Kurses
 * @param jsonCourse Der neue Inhalt, mit dem verglichen werden soll
 */
function compare(id: string, jsonCourse: CourseTopics) {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get("courseInfo", (storage: storage) => {
      const { courseInfo } = storage;
      resolve(
        getIdDiff(
          getIdArrayFromActivities(topics2activities(courseInfo[id] ?? {})),
          getIdArrayFromActivities(topics2activities(jsonCourse))
        )
      );
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

function ArrayLengthOrString(data: Array<any> | string) {
  if (typeof data === "string") {
    return data;
  } else {
    return data.length;
  }
}

function checkAndGenerateNewContentHeader(id: string): Promise<HTMLElement> {
  return new Promise((resolve, reject) => {
    check(id).then((e) => {
      resolve(generateDashboardCardHeader(ArrayLengthOrString(e)));
    });
  });
}

export { check, generateDashboardCardHeader, checkAndGenerateNewContentHeader };
var added = false;
export default function () {
  if (!added) {
    added = true;
    document.querySelector("section.block_myoverview").insertAdjacentElement(
      "beforebegin",
      cardButton({
        id: "DetectChangesBtn",
        options: { text: "Änderungen ansehen", icon: "rocket", link: "#" },
        onclick: () => {
          document.getElementById("DetectChangesBtn").remove();
          document
            .querySelectorAll(".card-deck.dashboard-card-deck > div")
            .forEach((element) => {
              checkAndGenerateNewContentHeader(
                getIdFromLink(
                  ((element as HTMLDivElement).children[0] as HTMLAnchorElement)
                    .href
                )
              ).then((elem) => {
                element.insertAdjacentElement("afterbegin", elem);
              });
            });
        },
      })
    );
  }
}
