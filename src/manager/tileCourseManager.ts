import { storage } from "@shared/types";

export default function (params: { options: storage }): void {
  // Example POST method implementation:
  const sessionKey = new URL(
    (
      document.querySelector(
        ".usermenu .dropdown div[data-rel='menu-content'] > a:last-child",
      ) as HTMLAnchorElement
    ).href,
  ).searchParams.get("sesskey");
  console.log("SessionKey", sessionKey);
  // Default options are marked with *
  document.querySelector("ul.tiles").insertAdjacentHTML(
    "afterend",
    `<ul id="smjt-listformat">
      
  </ul>`,
  );
  (document.querySelector("ul.tiles") as HTMLUListElement).style.display =
    "none";
  interface tileFetchResult {
    result:
      | [
          {
            data: {
              html: string;
            };
            error: false;
          },
        ]
      | {
          error: string;
          errorcode: string;
          stacktrace: unknown;
          debuginfo: unknown;
          reproductionlink: unknown;
        };
    section: string;
  }
  function generateTileFetch(section: string): Promise<tileFetchResult> {
    return new Promise((resolve, reject) => {
      fetch(
        `https://moodle.jsp.jena.de/lib/ajax/service.php?sesskey=${sessionKey}&info=format_tiles_get_single_section_page_html`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },

          body: JSON.stringify([
            {
              index: 0,
              methodname: "format_tiles_get_single_section_page_html",
              args: {
                courseid: new URL(location.href).searchParams.get("id"),
                sectionid: section,
                setjsusedsession: true,
              },
            },
          ]), // body data type must match "Content-Type" header
        },
      )
        .then((response) => response.json())
        .then((data) => {
          resolve({
            result: data,
            section,
          });
        });
    });
  }
  const promises: Promise<tileFetchResult>[] = [];
  document
    .querySelectorAll(
      "ul.tiles > li:not([aria-hidden='true']):not(.moveablesection)",
    )
    .forEach((sectionTile: HTMLLIElement) => {
      const section = sectionTile.getAttribute("data-section");
      promises.push(generateTileFetch(section));
    });
  Promise.all(promises).then((data) => {
    data = data.sort((a, b) => {
      return parseInt(a.section) - parseInt(b.section);
    });

    console.log(data);
    data.forEach((tileData) => {
      /* eslint-disable-next-line */
      //@ts-ignore
      if (tileData.result.length != undefined) {
        const tempDivContainer = document.createElement("div");
        tempDivContainer.innerHTML = tileData.result[0].data.html;
        tempDivContainer.querySelector("#sectionbuttons")?.remove();
        tempDivContainer.querySelector(".tileiconcontainer")?.remove();
        tempDivContainer.querySelector(".completionhelp")?.remove();
        document
          .getElementById("smjt-listformat")
          .insertAdjacentHTML("beforeend", tempDivContainer.innerHTML);
      }
    });
  });
}
