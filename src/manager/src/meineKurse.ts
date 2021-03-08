import {
  fächer,
  storage,
  CourseTopics,
  Activity,
  localStorage,
} from "@shared/types";
import { getIdFromLink } from "./utils";

export default function (params: { options: storage }) {
  const { options } = params;

  try {
    const Fächer: fächer = options["fächer"];

    var courseListLi = document.querySelectorAll<HTMLLinkElement>(
      "section[data-block='course_list'] ul.unlist > li > div > a"
    );
    console.log(Object.keys(Fächer));
    courseListLi.forEach((item) => {
      const id = getIdFromLink(item.href);
      var name = item.textContent.trim();

      if (
        Fächer[id]?.emoji?.trim() != "" &&
        Fächer[id]?.short?.trim()?.length > 0
      ) {
        item.innerHTML = Fächer[id].emoji + " " + Fächer[id].short;
      } else if (Fächer[id]?.short && Fächer[id]?.short?.trim()?.length > 0) {
        item.innerHTML = item.innerHTML.replace(
          item.textContent.trim(),
          Fächer[id].short
        );
      }
    });
  } catch (err) {
    console.log(err);
  }
}
