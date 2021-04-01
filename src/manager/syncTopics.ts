import { localStorage } from "@shared/types";
import course2json from "./course2json";
import { getIdFromLink } from "./utils";

export default function (): void {
  try {
    const list = course2json(document.body.innerHTML);
    console.log("LISTE", list);
    if (list.status === "success") {
      chrome.storage.local.get("courseInfo", (items: localStorage) => {
        items.courseInfo[getIdFromLink(location.href)] = list.list;
        chrome.storage.local.set({ courseInfo: items.courseInfo });
      });
    }
  } catch (err) {
    console.error(err);
  }
}