import { storage } from "@shared/types";
import { cardButton } from "./htmlBuilder";

export default function (params: { options: storage }) {
  const { options } = params;

  if (options["removeNavigationBlock"] === true) {
    const navBlock = document.querySelector(
      "section.block_navigation.block[data-block='navigation']"
    );
    if (location.pathname === "/my/") {
      navBlock.insertAdjacentElement(
        "beforebegin",
        cardButton({
          options: { link: location.origin, icon: "home", text: "Startseite" },
        })
      );
    } else if (location.pathname === "/") {
      // Muss über der Kurs-Liste stehen
      document
        .querySelector("section[data-block='course_list']")
        .insertAdjacentElement(
          "beforebegin",
          cardButton({
            options: {
              link: location.origin + "/my/",
              icon: "tachometer",
              text: "Dashboard",
            },
          })
        );
    } else {
      navBlock.insertAdjacentElement(
        "beforebegin",
        cardButton({
          options: {
            link: location.origin + "/my/",
            icon: "tachometer",
            text: "Dashboard",
          },
        })
      );
    }
  }

  // var itm = document.querySelectorAll<HTMLLIElement>(
  //   "li.current_branch > ul > li"
  // );
  // const ulNode = document.createElement("ul");
  // itm.forEach((elem) => {
  //   var cln = elem.cloneNode(true) as HTMLLIElement;
  //   cln.onclick = elem.onclick;
  //   ulNode.appendChild(cln);
  // });

  // document
  //   .querySelector(
  //     "section.block_navigation.block[data-block='navigation'] .content"
  //   )
  //   .replaceWith(ulNode);
}
