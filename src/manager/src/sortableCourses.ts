import { storage } from "@shared/types";
import * as Sortable from "sortablejs";
import { AutoScroll } from "sortablejs";
import { cardButton, span } from "./htmlBuilder";
export default function () {
  document.querySelector("section.block_myoverview").insertAdjacentElement(
    "beforebegin",
    cardButton({
      options: { text: "Kurse sortieren", link: "#", icon: "rocket" },
      onclick: activateSorting,
    })
  );
}
var sortable: Sortable;
function activateSorting() {
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
  chrome.storage.sync.get("sortedCourses", (value: storage) => {
    sortable.sort(value.sortedCourses);
  });
}

function saveAndDeactivate() {
  //TODO: SAVE
  const sortedCoursesArray = sortable.toArray();
  chrome.storage.sync.set({ sortedCourses: sortedCoursesArray });
  //TODO: Deactivate
  sortable.destroy();
}

function activate() {
  var status = false;

  const sortButton = document.createElement("button");
  sortButton.className = "btn btn-outline-primary";
  sortButton.addEventListener("click", () => {
    if (status === false) {
      // Falls sortieren AUS ist.
      activateSorting();
      buttonText.innerHTML = "Speichern";
      status = true;
    } else if (status === true) {
      // Falls sortieren AN ist.
      saveAndDeactivate();
      buttonText.innerHTML = "Kurse sortieren";
      status = false;
    } else {
      // Some Random Numbers :)
      alert("Ran into Error: #78542846879674465");
    }
  });

  const buttonIcon = document.createElement("i");
  buttonIcon.className = "icon fa fa-sort-amount-asc fa-fw";

  const buttonText = document.createElement("span");
  buttonText.innerText = "Kurse sortieren";

  sortButton.append(buttonIcon, buttonText);

  document
    .querySelector("div[data-region='filter']")
    .children[0].insertAdjacentElement("afterend", sortButton);
}

export { activate };
