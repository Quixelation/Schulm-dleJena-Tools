import { storage } from "@shared/types";

import * as Sortable from "sortablejs";

import tippy from "tippy.js";

//import { AutoScroll } from "sortablejs";

import { button, cardButton, span } from "./htmlBuilder";

var sortable: Sortable;

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
  //TODO: Add Sorting for List-View
  var el = document.querySelector(
    "div.card-deck.dashboard-card-deck"
  ) as HTMLDivElement;

  //Sortable.mount(new AutoScroll());

  sortable = Sortable.create(el, {
    animation: 150, // ms, animation speed moving items when sorting, `0` — without animation
    easing: "cubic-bezier(1, 0, 0, 1)", // Easing for animation. Defaults to null. See https://easings.net/ for examples.
    swapThreshold: 1,

    //Autoscroll see https://github.com/SortableJS/Sortable/tree/master/plugins/AutoScroll
    scroll: true, // Enable the plugin. Can be HTMLElement.
    scrollSensitivity: 30, // px, how near the mouse must be to an edge to start scrolling.
    scrollSpeed: 10, // px, speed of the scrolling
    bubbleScroll: true, // apply autoscroll to all parent elements, allowing for easier movement
  });
}

function deactivateSortable() {
  console.log("Destroying Sortable");
  sortable.destroy();
}

function saveAndDeactivate() {
  const sortedCoursesArray = sortable.toArray();
  chrome.storage.sync.set({ sortedCourses: sortedCoursesArray });

  deactivateSortable();
}
//TODO: Deactive changing ViewType while sorting w/ title="Not Supported while sorting"

function activate() {
  //Activate and Deactivate for sorting
  initializeSortable();
  //TODO: Possibly Add Check for undefined
  chrome.storage.sync.get("sortedCourses", (value: storage) => {
    sortable.sort(value.sortedCourses);
    deactivateSortable();
    var status = false;

    //TODO: animation not working; probably missing css
    tippy("#sortingdropdown", {
      content:
        "Es gibt bekannte Inkompatibilitäten mit der Drag&Drop-Sortierung!",
      animation: "shift-away-subtle",
      hideOnClick: false,
    });

    var displaydropdownTippy = tippy("#displaydropdown", {
      content: "Beende zuerst die Sortierung",
      animation: "shift-away-subtle",
      hideOnClick: false,
    })?.[0];
    console.log("displaydropdownTippy", displaydropdownTippy);

    displaydropdownTippy.disable?.();

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

        displaydropdownTippy.enable?.();
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
        displaydropdownTippy.disable?.();
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
  });
}

export { activate };
