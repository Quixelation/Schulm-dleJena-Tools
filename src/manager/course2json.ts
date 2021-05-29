export default function (
  courseHtmlData: string,
  tilesView = false,
): course2jsonOutput {
  const list: CourseTopics = {};
  const html = document.createElement("html");
  html.innerHTML = courseHtmlData;
  const topics = html.querySelectorAll("ul.topics > li");

  if (
    tilesView
      ? false
      : html.querySelector("body").id == "page-course-view-tiles"
  ) {
    return { status: "not-supported" };
  } else if (topics.length > 0) {
    try {
      topics.forEach((item) => {
        const name = item.querySelector(".sectionname").textContent.trim();
        const activities: Activity[] = [];

        item.querySelectorAll("ul.section > li").forEach((activity) => {
          //ScreenReader Text entfernen

          activity.querySelector(".instancename .accesshide")?.remove();
          const name = activity
            .querySelector(".instancename")
            ?.textContent?.trim();
          const type = activity.className
            .split(" ")
            .filter((e) => e.trim() != "")[1];
          /* eslint-disable-next-line */
          var details = "";
          activity
            .querySelectorAll(".contentafterlink")
            .forEach((contentElem) => {
              details += contentElem.textContent?.trim() + "\n";
            });
          const id = parseInt(activity.id.replace("module-", ""));
          activities.push({
            details,
            id,
            name,
            type,
          });
        });

        // activities.push({
        //   id: 456678678768678678678768768768768678768,
        //   details: "",
        //   name: "Hallo",
        //   type: "ressource",
        // });

        list[item.getAttribute(`data-section${tilesView ? "" : "id"}`)] = {
          activities,
          name,
        };
      });
      return {
        status: "success",
        list,
      };
    } catch (err) {
      err;
      return {
        status: "error",
        desc: "",
      };
    }
  } else {
    return {
      status: "error",
      desc: "Nichts gefunden",
    };
  }
}

type course2jsonOutput =
  | {
      status: "not-supported";
    }
  | {
      status: "success";
      list: CourseTopics;
    }
  | {
      status: "error";
      desc: string;
    };

export { course2jsonOutput };
