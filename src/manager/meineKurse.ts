import { fächer, storage } from "@shared/types";
import { getIdFromLink } from "./utils";

export default function (params: { options: storage }): void {
  const { options } = params;

  try {
    const Fächer: fächer = options["fächer"];

    const courseListLi = document.querySelectorAll<HTMLLinkElement>(
      "section[data-block='course_list'] ul.unlist > li > div > a"
    );
    console.log(Object.keys(Fächer));
    courseListLi.forEach((item) => {
      const id = getIdFromLink(item.href);
      // const name = item.textContent.trim();

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
