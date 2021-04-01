import { storage } from "@shared/types";

import * as Sortable from "sortablejs";

import tippy from "tippy.js";

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
  //TODO: Maybe sort the courses here
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
  const sortedCoursesArray = sortable.toArray();
  console.log(sortedCoursesArray);

  chrome.storage.sync.set({ [getSaveKey()]: sortedCoursesArray });

  deactivateSortable();
}
//TODO: Deactive changing ViewType while sorting w/ title="Not Supported while sorting"

//TODO: Spellchecking
const defaultDisplayTippyContent =
  "Die Sortierung der Listen-Ansicht und der Karten-Ansicht werden getrennt voneinander gespeichert. Es gibt ein bekanntes Problem beim Wechseln der Ansicht; falls dieses Auftritt: einfach die Seite neuladen";
const disabledDisplayTippyContent =
  "<b style='color: white; text-decoration: underline;text-decoration-color: #FF4136;text-decoration-thickness: 3px;'>Beende zuerst die Sortierung</b>";

/**
 * Gibt den Key aus, unter welchem die Daten für die SOrtierung der zurzeitigen Ansicht gespeichert sind.
 * DOM-Content der Fächer muss dafür geladen sein.
 * @returns Key, unter welchem die Sortierungsdaten für die zurzeitige Ansicht gespeichert sind.
 */
function getSaveKey() {
  let key: string;
  if (
    document.querySelector(
      "div[data-region='paged-content-page'] > ul.list-group"
    ) === null
  ) {
    key = "sortedCourses_cards";
  } else {
    key = "sortedCourses_list";
  }
  console.log("SaveKey:", key);
  return key;
}

async function sortCourses(): Promise<void> {
  console.log("Sorting Courses");
  //TODO: Possibly Add Check for undefined
  chrome.storage.sync.get([getSaveKey()], (value: storage) => {
    //Activate and Deactivate for sorting
    initializeSortable();
    if (value[getSaveKey()]) sortable.sort(value[getSaveKey()]);
    deactivateSortable();
    return;
  });
}
let status = false;
async function activate(): Promise<void> {
  await sortCourses();

  //TODO: animation not working; probably missing css
  tippy("#sortingdropdown", {
    content:
      "Es gibt bekannte Inkompatibilitäten mit der Drag&Drop-Sortierung!",
    animation: "shift-away-subtle",
    hideOnClick: false,
  });

  const displaydropdownTippy = tippy("#displaydropdown", {
    content: defaultDisplayTippyContent,
    animation: "shift-away-subtle",
    hideOnClick: false,
    allowHTML: true,
  })?.[0];
  console.log("displaydropdownTippy", displaydropdownTippy);

  const sortButton = document.createElement("button");
  sortButton.className = "btn btn-outline-primary mb-1 mr-1";
  sortButton.addEventListener("click", () => {
    if (status === false) {
      // Falls sortieren AUS ist.
      initializeSortable();
      buttonText.innerHTML = "Speichern";
      document
        .getElementById("SortCoursesButtonIconId")
        .classList.add("fa-hand-rock-o");
      document
        .getElementById("SortCoursesButtonIconId")
        .classList.remove("fa-hand-paper-o");

      displaydropdownTippy.setContent(disabledDisplayTippyContent);
      document.getElementById("displaydropdown").classList.add("disabled");
      status = true;
    } else if (status === true) {
      // Falls sortieren AN ist.
      saveAndDeactivate();

      buttonText.innerHTML = "Kurse sortieren";

      document
        .getElementById("SortCoursesButtonIconId")
        .classList.remove("fa-hand-rock-o");
      document
        .getElementById("SortCoursesButtonIconId")
        .classList.add("fa-hand-paper-o");

      document.getElementById("displaydropdown").classList.remove("disabled");
      displaydropdownTippy.setContent(defaultDisplayTippyContent);
      status = false;
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
