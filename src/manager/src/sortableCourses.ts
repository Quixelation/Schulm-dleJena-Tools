import * as Sortable from "sortablejs";
import { AutoScroll } from "sortablejs";
import { cardButton, span } from "./htmlBuilder";
export default function () {
  document.querySelector("section.block_myoverview").insertAdjacentElement(
    "beforebegin",
    cardButton({
      options: { text: "Kurse sortieren", link: "#", icon: "rocket" },

      onclick: function () {
        var el = document.querySelector(
          "div.card-deck.dashboard-card-deck"
        ) as HTMLDivElement;

        //Sortable.mount(new AutoScroll());

        var sortable = Sortable.create(el, {
          animation: 150, // ms, animation speed moving items when sorting, `0` — without animation
          easing: "cubic-bezier(1, 0, 0, 1)", // Easing for animation. Defaults to null. See https://easings.net/ for examples.
          swapThreshold: 1,

          //Autoscroll see https://github.com/SortableJS/Sortable/tree/master/plugins/AutoScroll
          scroll: true, // Enable the plugin. Can be HTMLElement.
          scrollSensitivity: 30, // px, how near the mouse must be to an edge to start scrolling.
          scrollSpeed: 10, // px, speed of the scrolling
          bubbleScroll: true, // apply autoscroll to all parent elements, allowing for easier movement
        });
      },
    })
  );
}
