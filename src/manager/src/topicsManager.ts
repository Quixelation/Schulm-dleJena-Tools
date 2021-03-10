import { storage } from "@shared/types";
function toggleNoEmptyTopics(force?: true) {
  if (force) {
    document.body.classList.add("no-empty-topics");
  } else {
    document.body.classList.toggle("no-empty-topics");
  }
  if (document.body.classList.contains("no-empty-topics")) {
    document.getElementById(
      "leereThemenAnzeigenTextVersteckenAnzeigen"
    ).innerText = "anzeigen";
    document
      .getElementById("leereThemenAnzeigenIcon")
      .classList.remove("fa-eye-slash");
    document.getElementById("leereThemenAnzeigenIcon").classList.add("fa-eye");
  } else {
    document.getElementById(
      "leereThemenAnzeigenTextVersteckenAnzeigen"
    ).innerText = "verstecken";
    document
      .getElementById("leereThemenAnzeigenIcon")
      .classList.remove("fa-eye");
    document
      .getElementById("leereThemenAnzeigenIcon")
      .classList.add("fa-eye-slash");
  }
}
export default function (params: { options: storage }) {
  const { options } = params;
  if (document.querySelector(".course-content ul.topics") !== null) {
    chrome.storage.sync.get(["reversed_courses", "no-empty-topics"], (val) => {
      var reversed_courses: number[] = val["reversed_courses"];
      console.log("reversed_courses", reversed_courses);
      var href = location.href;
      const id = parseInt(href.slice(href.indexOf("id=") + 3));
      if (reversed_courses?.includes(id)) {
        document.getElementById("ThemenReihenfolgeUmkehren").style.background =
          "green";
        document
          .querySelector(".course-content ul.topics")
          .classList.add("reversed");
      }
      var noEmptyTopics: number[] = val["no-empty-topics"];
      console.log("noEmptyTopics", noEmptyTopics);
      console.log("id", id);
      console.log("contains", noEmptyTopics?.includes(id));
      if (noEmptyTopics?.includes(id)) {
        document.getElementById("LeereThemenAnzeigenBtn").style.background =
          "green";
        toggleNoEmptyTopics(true);
      }
    });
    console.log("Hello from topicsManager.js");

    //#region OptionsCreator
    const buttonsContainer = document.createElement("div");
    buttonsContainer.style.display = "flex";

    const optionsArray: {
      onClick: (e: MouseEvent) => void;
      text: string;
      id: string;
    }[] = [
      {
        id: "ThemenReihenfolgeUmkehren",
        onClick: (e) => {
          const isReversed = document
            .querySelector(".course-content ul.topics")
            .classList.contains("reversed");
          var href = location.href;
          const id = parseInt(href.slice(href.indexOf("id=") + 3));
          chrome.storage.sync.get(["reversed_courses"], (val) => {
            var reversed_courses: number[] = val["reversed_courses"];
            console.log("reversed_courses", reversed_courses);
            if (reversed_courses == null) {
              reversed_courses = [];
            }
            console.log("reversed_courses", reversed_courses);
            reversed_courses = reversed_courses.filter((item) => {
              return item != id;
            });
            console.log("reversed_courses", reversed_courses);
            document.getElementById(
              "ThemenReihenfolgeUmkehren"
            ).style.background = "";
            if (!isReversed) {
              console.log("pushId");
              reversed_courses.push(id);
              document.getElementById(
                "ThemenReihenfolgeUmkehren"
              ).style.background = "green";
            }
            console.log("reversed_courses", reversed_courses);
            chrome.storage.sync.set({
              reversed_courses,
            });
          });
          document
            .querySelector(".course-content ul.topics")
            .classList.toggle("reversed");
        },
        text: "Reihenfolge der Themen umkehren <i class='fa fa-arrows-v' ></i>",
      },
      {
        id: "LeereThemenAnzeigenBtn",
        text:
          "Leere Themen <span id='leereThemenAnzeigenTextVersteckenAnzeigen'>verstecken</span> <i id='leereThemenAnzeigenIcon' class='fa fa-eye-slash' ></i>",
        onClick: (e) => {
          toggleNoEmptyTopics();
          //#region saveSettings

          const isChosen = document.body.classList.contains("no-empty-topics");
          var href = location.href;
          const id = parseInt(href.slice(href.indexOf("id=") + 3));
          chrome.storage.sync.get(["no-empty-topics"], (val) => {
            var reversed_courses: number[] = val["no-empty-topics"];
            console.log("no-empty-topics", reversed_courses);
            if (reversed_courses == null) {
              reversed_courses = [];
            }
            console.log("no-empty-topics", reversed_courses);
            reversed_courses = reversed_courses.filter((item) => {
              return item != id;
            });
            console.log("no-empty-topics", reversed_courses);
            //@ts-ignore
            e.target.style.background = "";
            if (isChosen) {
              console.log("pushId");
              reversed_courses.push(id);
              //@ts-ignore
              e.target.style.background = "green";
            }
            console.log("no-empty-topics", reversed_courses);
            chrome.storage.sync.set({
              "no-empty-topics": reversed_courses,
            });
          });

          //#endregion
        },
      },
    ];
    optionsArray.forEach((option) => {
      const btn = document.createElement("div");
      btn.classList.add("btn", "btn-primary", "topicsManagerBtn");
      btn.innerHTML = option.text;
      btn.style.width = "100%";
      btn.style.marginBottom = "10px";
      btn.addEventListener("click", option.onClick);
      btn.id = option.id;
      buttonsContainer.append(btn);
    });
    //#endregion

    document.getElementById("region-main-box").prepend(buttonsContainer);

    if (document.querySelectorAll("div.content > ul.section") !== null) {
      var allSections = document.querySelectorAll<HTMLLIElement>(
        "li.section.main"
      );
      allSections.forEach((section) => {
        const courseTitle = /Thema [0-9]+$/g.test(
          section.querySelector(".sectionname").textContent.trim()
        );
        const hasContent = section.querySelector("div.content > ul.section")
          ? section.querySelector("div.content > ul.section").innerHTML !== ""
          : false;
        console.log("Section Information:", {
          courseTitle: courseTitle,
          bool: !courseTitle && !hasContent,
          hasContent,
        });
        if (courseTitle && !hasContent) {
          // Es gibt keinen Titel und keinen Content
          section.classList.add("emptyTopic");
        }
      });
    }
  }
}
