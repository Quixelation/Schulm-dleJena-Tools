import { CourseTopics, localStorage } from "@shared/types";
import course2json from "./course2json";
import { getIdFromLink } from "./utils";

export default function (): void {
  try {
    const list = course2json(document.body.innerHTML);
    console.log("LISTE", list);
    if (list.status === "success") {
      saveCourse(getIdFromLink(location.href), list.list);
    }
  } catch (err) {
    console.error(err);
  }
}

function saveCourse(
  id: string,
  jsonCourseContent: CourseTopics
): Promise<void> {
  return new Promise((resolve) => {
    chrome.storage.local.get("courseInfo", (items: localStorage) => {
      items.courseInfo[id] = jsonCourseContent;
      chrome.storage.local.set({ courseInfo: items.courseInfo }, resolve);
    });
  });
}

export { saveCourse };
