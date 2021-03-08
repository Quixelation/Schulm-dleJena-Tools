import {
  fächer,
  storage,
  CourseTopics,
  Activity,
  localStorage,
} from "@shared/types";
import course2json from "./../../shared/course2json";
import { getIdFromLink } from "./utils";

export default function (params: { options: storage }) {
  const { options } = params;
  try {
    const list = course2json(document.body.innerHTML);
    console.log("LISTE", list);
    if (typeof list !== "string") {
      chrome.storage.local.get("courseInfo", (items: localStorage) => {
        items.courseInfo[getIdFromLink(location.href)] = list;
        chrome.storage.local.set({ courseInfo: items.courseInfo });
      });
    }
  } catch (err) {
    console.error(err);
  }
}
