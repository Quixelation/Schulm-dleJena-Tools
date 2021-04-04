import { storage } from "src/types";

import * as Sortable from "sortablejs";

import tippy from "tippy.js";
import { getCoursesQuerySelector, getViewType } from "./DashboardCourses";

//import { AutoScroll } from "sortablejs";

let sortable: Sortable;

/**
 * Erstellt eine neue Sortable Instanz
 */
function initializeSortable() {
  console.log("Initialized Sortable");
  // document.querySelector("section.block_myoverview").insertAdjacentElement(
  //   "beforebegin",
  //   cardButton({
  //     options: { text: "Kurse sortieren", link: "#", icon: "rocket" },
  //     onclick: activateSorting,
  //   })
  // );

  //Sortable.mount(new AutoScroll());
  sortable = Sortable.create(
    document.querySelector(
      "div[data-region='paged-content-page'] > ul.list-group"
    )
      ? document.querySelector(
          "div[data-region='paged-content-page'] > ul.list-group"
        )
      : document.querySelector("div.card-deck.dashboard-card-deck"),
    {
      animation: 150, // ms, animation speed moving items when sorting, `0` — without animation
      easing: "cubic-bezier(1, 0, 0, 1)", // Easing for animation. Defaults to null. See https://easings.net/ for examples.
      swapThreshold: 1,

      //Autoscroll see https://github.com/SortableJS/Sortable/tree/master/plugins/AutoScroll
      scroll: true, // Enable the plugin. Can be HTMLElement.
      scrollSensitivity: 30, // px, how near the mouse must be to an edge to start scrolling.
      scrollSpeed: 10, // px, speed of the scrolling
      bubbleScroll: true, // apply autoscroll to all parent elements, allowing for easier movement
    }
  );
}

function deactivateSortable() {
  console.log("Destroying Sortable");
  sortable.destroy();
}

function saveAndDeactivate() {
  const sortedCoursesArray: string[] = [];
  const cardContainer = document.querySelector(getCoursesQuerySelector(false));

  Object.keys(cardContainer.children).forEach((index) => {
    const child = cardContainer.children.item(parseInt(index));

    sortedCoursesArray.push(child.getAttribute("data-course-id"));
  });

  console.log("", sortedCoursesArray);

  chrome.storage.sync.set({ ["sortedCourses"]: sortedCoursesArray });

  deactivateSortable();
}

const disabledDisplayTippyContent =
  "<b style='color: white; text-decoration: underline;text-decoration-color: #FF4136;text-decoration-thickness: 3px;'>Beende zuerst die Sortierung</b>";

// /**
//  * Gibt den Key aus, unter welchem die Daten für die SOrtierung der zurzeitigen Ansicht gespeichert sind.
//  * DOM-Content der Fächer muss dafür geladen sein.
//  * @returns Key, unter welchem die Sortierungsdaten für die zurzeitige Ansicht gespeichert sind.
//  */
// function getSaveKey(): string | false {
//   const viewType = getViewType();
//   if (viewType === "card") {
//     return "sortedCourses_cards";
//   } else if (viewType === "list") {
//     return "sortedCourses_list";
//   } else {
//     return false;
//   }
// }

async function sortCourses(): Promise<void> {
  console.log("Sorting Courses");
  chrome.storage.sync.get("sortedCourses", (value: storage) => {
    const viewType = getViewType();
    if (viewType === "summary") return;

    const coursesContainer = document.querySelector(
      getCoursesQuerySelector(false)
    );

    const coursesList: { [id: string]: Element } = {};
    Object.keys(coursesContainer.children).forEach((index) => {
      const child = coursesContainer.children.item(parseInt(index));
      coursesList[child.getAttribute("data-course-id")] = child;
    });
    console.log("coursesList", coursesList);

    const saveOrder: string[] = value["sortedCourses"];
    if (saveOrder?.length > 0) {
      console.log("saveOrder", saveOrder);
      const unusedIds = { ...coursesList };
      coursesContainer.innerHTML = "";
      saveOrder.forEach((id) => {
        console.log({ id, idC: coursesList[id] });
        coursesContainer.append(coursesList[id]);
        delete unusedIds[id];
      });
      console.log("unusedId", unusedIds);

      Object.keys(unusedIds).forEach((id) => {
        coursesContainer.append(unusedIds[id]);
      });
    }

    return;
  });
}

let status = false;
async function activate(): Promise<void> {
  await sortCourses();

  tippy("#sortingdropdown", {
    content:
      "Es gibt bekannte Inkompatibilitäten mit der Drag&Drop-Sortierung!",
    animation: "shift-away-subtle",
    hideOnClick: false,
  });

  const displaydropdownTippy = tippy("#displaydropdown", {
    content: disabledDisplayTippyContent,
    animation: "shift-away-subtle",
    hideOnClick: false,
    allowHTML: true,
  })?.[0];
  displaydropdownTippy?.disable();

  const sortButton = document.createElement("button");
  sortButton.className = "btn btn-outline-primary mb-1 mr-1";
  sortButton.addEventListener("click", () => {
    function setSortSaveCoursesBtn(state: boolean): void {
      buttonText.innerHTML = state ? "Speichern" : "Kurse sortieren";
      document
        .getElementById("SortCoursesButtonIconId")
        .classList[state ? "add" : "remove"]("fa-hand-rock-o");
      document
        .getElementById("SortCoursesButtonIconId")
        .classList[!state ? "add" : "remove"]("fa-hand-paper-o");

      displaydropdownTippy[state ? "enable" : "disable"]?.();
      document
        .getElementById("displaydropdown")
        .classList[state ? "add" : "remove"]("disabled");
    }

    if (status === false) {
      // Falls sortieren AUS ist.
      initializeSortable();
      status = true;
      setSortSaveCoursesBtn(status);
    } else if (status === true) {
      // Falls sortieren AN ist.
      saveAndDeactivate();
      status = false;
      setSortSaveCoursesBtn(status);
    } else {
      // Some Random Numbers :)
      alert("Ran into Error: #78542846879674465");
    }
  });
  sortButton.id = "sortableCoursesSortButton";

  const buttonIcon = document.createElement("i");
  buttonIcon.className = "icon fa fa-hand-paper-o fa-fw";
  buttonIcon.id = "SortCoursesButtonIconId";

  const buttonText = document.createElement("span");
  buttonText.innerText = "Kurse sortieren";

  sortButton.append(buttonIcon, buttonText);

  document
    .querySelector("div[data-region='filter']")
    .children[0].insertAdjacentElement("afterend", sortButton);
  tippy("#sortableCoursesSortButton", {
    content: "Kurse durch Drag&Drop sortieren",
    animation: "shift-away-subtle",
  });
}

export { activate, sortCourses };
