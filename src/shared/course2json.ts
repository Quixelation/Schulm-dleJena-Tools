import { Activity, CourseTopics } from "./../types";
export default function (courseHtmlData: string) {
  const list: CourseTopics = {};
  const html = document.createElement("html");
  html.innerHTML = courseHtmlData;
  const topics = html.querySelectorAll("ul.topics > li");
  if (html.querySelector("body").id == "page-course-view-tiles") {
    return "Nicht Unterstützt";
  } else if (topics.length > 0) {
    try {
      topics.forEach((item) => {
        var name = item.querySelector(".sectionname").textContent.trim();
        var activities: Activity[] = [];
        item.querySelectorAll("ul.section > li").forEach((activity) => {
          //ScreenReader Text entfernen

          activity.querySelector(".instancename .accesshide")?.remove();
          var name = activity
            .querySelector(".instancename")
            ?.textContent?.trim();
          var type = activity.className.split(" ")[1];
          var details = activity
            .querySelector(".contentafterlink")
            ?.textContent?.trim();
          var id = parseInt(activity.id.replace("module-", ""));
          activities.push({
            details,
            id,
            name,
            type,
          });
        });
        list[item.getAttribute("data-sectionid")] = { activities, name };
      });
      return list;
    } catch (err) {
      err;
      return "Fehler: Error";
    }
  } else {
    return "Fehler: Nichts gefunden";
  }
}
